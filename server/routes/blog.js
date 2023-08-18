const express = require("express")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const qs = require("qs");
const {getArticles, getArticle, getBlogCategories, getCategoryArticles} = require("../controllers/blogControllers");
const router = express.Router();

router.get("/article/:articleId",isLoggedIn,getArticle)
router.get("/articles/:limit",isLoggedIn, (req,res) =>{
    const query = qs.stringify({
        pagination: {
            start: 0,
            limit: req.params.limit
        }
    })
    console.log("home articles", query)
    return getArticles(req,res,query)
} )
router.get("/categories/:categoryId",isLoggedIn, getCategoryArticles)
router.get("/categories",isLoggedIn, getBlogCategories)


module.exports = router