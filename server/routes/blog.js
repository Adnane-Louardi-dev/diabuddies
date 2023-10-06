const express = require("express")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const qs = require("qs");
const {getArticles,
    getCategoryArticles,
    getBlogCategories,
    getArticle,
    toggleLikeAnArticle,
    isArticleLiked,
    readArticle} = require("../controllers/blogControllers");
const router = express.Router();

router.get("/article/:articleId",getArticle)
router.get("/article/like/:articleId",isArticleLiked)
router.post("/article/like/:articleId",isLoggedIn,toggleLikeAnArticle)
router.post("/article/read/:articleId",isLoggedIn,readArticle)
router.get("/articles/:limit", (req,res) =>{
    const query = qs.stringify({
        pagination: {
            start: 0,
            limit: req.params.limit
        }
    })
    console.log("home articles", query)
    return getArticles(req,res,query)
} )
router.get("/categories/:categorySlug", getCategoryArticles)
router.get("/categories", getBlogCategories)


module.exports = router