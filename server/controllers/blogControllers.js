const axios = require("axios");
const {strapiInstance} = require("../middlewares/blogAxios");
const qs = require("qs");
const {likeSchema} = require("../models/likeSchema");
const {actionLogSchema} = require("../models/actionLogSchema");

const toggleLikeAnArticle = async (req,res) => {
    const isLiked =  await likeSchema.exists({
        userId: req.user._id,
        articleId: req.params.articleId
    })
    if(!!isLiked){
        await likeSchema.findByIdAndRemove(isLiked._id)
        return res.status(200).json({message: "like deleted successfully"})
    }
    await likeSchema.create({
        userId: req.user._id,
        articleId: req.params.articleId
    })
    return res.status(200).json({message: "like the article succefully"})
}
const isArticleLiked = async (req,res) => {
    const isLiked =  await likeSchema.exists({
        userId: req.user._id,
        articleId: req.params.articleId
    })
    return res.status(200).json({isLiked: !!isLiked})
}
const readArticle = async (req,res) => {
    const haveReadArticle = await actionLogSchema.findOne({
        userId: req.user._id,
        itemId: req.params.articleId,
        actionType: "readABlog"
    })
    if(haveReadArticle){
        return res.status(200).json({message: "already read"})
    }
    await actionLogSchema.create({
        userId: req.user._id,
        itemId: req.params.articleId,
        actionType: "readABlog"
    })
    return res.status(200).json({message: "read successfully"})
}
const getArticle = async (req,res) => {
    try {
        const baseQuery = qs.stringify({
            populate: {
                image: true,
                categories: true,
                author: {
                    populate: ["avatar"]
                }
            }
        })
        const [{data:article},likeCount,isLiked] = await Promise.all([
            strapiInstance.get(`/api/articles/${req.params.articleId}?${baseQuery}`),
            likeSchema.countDocuments({
                articleId: req.params.articleId
            }),
            likeSchema.exists({
                userId: req.user._id,
                articleId: req.params.articleId
            })
        ])
        const query = qs.stringify({
            pagination: {
                start: 0,
                limit: 3
            },
            populate: {
                image: true,
                categories: true,
            }
            // filters: {
            //     categories: {
            //         $eq: article.
            //     }
            // }
        })
        const {data:relatedArticles} = await strapiInstance.get(`/api/articles/?${query}`)
        return res.status(200).json({...article, relatedArticles:relatedArticles.data, likeCount, isLiked: !!isLiked})
    } catch (e) {
        return res.status(404).json({message: "cannot get this article"})
    }
}

const getArticles = async (req,res,query="") => {
    try {
        const baseQuery = qs.stringify({
            populate: {
                image: true,
                categories: true
            }
        })
        const {data:articles} = await strapiInstance.get(`/api/articles/?${baseQuery}&${query}`)
        return res.status(200).json(articles)
    } catch (e) {
        return res.status(404).json({message: "cannot create articles"})
    }
}

const getBlogCategories = async (req,res) => {
    try {
        const {data:articles} = await strapiInstance.get(`/api/categories/`)
        return res.status(200).json(articles)
    } catch (e) {
        return res.status(404).json({message: "cannot get categories"})
    }
}

const getCategoryArticles = async (req,res) => {
    try {
        const query = qs.stringify({
            filters: {
                categories: {
                    $eq: req.params.categoryId
                }
            }
        })
        const {data:articles} = await strapiInstance.get(`/api/products/?${query}`)
        return res.status(200).json(articles)
    } catch (e) {
        return res.status(404).json({message: "cannot create articles"})
    }
}


module.exports = {getArticles,
    getCategoryArticles,
    getBlogCategories,
    getArticle,
    toggleLikeAnArticle,
    isArticleLiked,
    readArticle}