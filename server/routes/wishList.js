const express = require("express")
const router = express.Router();
const wishListSchema = require("../models/wishListSchema")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
router.get("/", isLoggedIn,async (req,res) => {
    try {
        const wishList = await wishListSchema.find({userId: req.user._id})
        const wishedProducts = wishList ? wishList.map(wishItem => wishItem.productId) : []
        return res.status(200).json(wishedProducts)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})

router.post("/", isLoggedIn, async (req,res) => {
    try {
        const wishedItem = await wishListSchema.findOne({userId: req.user._id, productId: req.query.id})
        let wishItem;
        if(wishedItem){
            wishItem = await wishListSchema.remove(wishedItem)
        } else {
            wishItem = await wishListSchema.create({userId: req.user._id, productId: req.query.id})
            await wishItem.save()
        }
        return res.status(200).json(wishItem)
    } catch (e) {
        console.error(e);
        return res.status(404).json(e)
    }
})

router.delete("/", isLoggedIn, async (req,res) => {
    try {
        const wishItem = await wishListSchema.findOneAndDelete(req.query.id)
        if(!wishItem){
            throw new Error("wish item doesn't exist")
        }
        return res.status(200).json(wishItem)
    } catch (e) {
        console.error(e.message)
        return res.status(404).json(e)
    }
})


module.exports = router