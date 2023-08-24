const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const commentSchema = require("../models/commentSchema");
const {newActionLog} = require("../controllers/gamifyControllers");

router.get("/:articleId",async (req,res)=>{
    const {articleId} = req.params
    const comments = await commentSchema.find({user: req.user._id, article: articleId, isDeleted:false, isReply: false}).sort({createdAt: 1}).lean().then((res)=>{
        return res.map(comment => {
            const {givenName, familyName, photo, createdAt, _id} = comment.user
            return {...comment, user:{
                    name: `${givenName} ${familyName}`,
                    photo, createdAt, _id
                }}
        })
    }).catch(()=>{
        return []
    })
    return res.status(200).json(comments)
})
router.post("/:articleId",isLoggedIn,async (req,res)=>{
    try {
        const {articleId} = req.params;
        const existedComment = await commentSchema.exists({
            user: req.user._id,
            article: articleId
        })
        if(!existedComment){
            newActionLog("postAComment",req.user._id)
        }
        const comment = await commentSchema.create({
            user: req.user._id,
            article: articleId,
            content: req.body.comment
        })
        return res.status(201).json(comment)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})
router.post("/reply/:articleId/:commentId",isLoggedIn,async (req,res)=>{
    try {
        const {articleId,commentId} = req.params
        const comment = await commentSchema.create({
            user: req.user._id,
            article: articleId,
            content: req.body.comment,
            isReply: true
        })
        await comment.save()
        const parentComment = await commentSchema.findById(commentId)
        parentComment.comments.push(comment)
        console.log("parent",parentComment)
        await parentComment.save()
        return res.status(201).json(comment)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})

router.put("/:articleId/:commentId",isLoggedIn,async (req,res)=>{
    try {
        const {articleId,commentId} = req.params
        console.log("id ",articleId," comment ",req.body)
        const comment = await commentSchema.findOneAndUpdate(
            {user: req.user._id, _id: commentId, article: articleId},
            req.body,{new: true})

        return res.status(201).json(comment)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})
router.delete("/:articleId/:commentId",isLoggedIn,async (req,res)=>{
    try {
        const {articleId,commentId} = req.params
        let comment;
        if(req.user.isAdmin){
            comment = await commentSchema.findByIdAndUpdate(commentId,{isRemoved: true})
        } else {
            comment = await commentSchema.findOneAndUpdate(
                {user: req.user._id, _id: commentId, article: articleId},
                {isReported: true})
        }
        return res.status(201).json(comment)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})

module.exports = router