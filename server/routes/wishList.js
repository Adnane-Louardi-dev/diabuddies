const express = require("express")
const router = express.Router();
const wishListSchema = require("../models/wishListSchema")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const {blogInstance, storeInstance} = require("../middlewares/blogAxios");


router.get("/:slug", isLoggedIn,async (req, res) => {
    try {
        const slug= req.params.slug.trim().toLowerCase()
        console.log("slug",slug)
        const wishList = await wishListSchema.find({
            userId: req.user._id,
            isProduct: slug === "product",
            isBlog: slug === "blog"
        })
        let wishedProducts;
        if(slug === "blog") {
            wishedProducts = await Promise.all(wishList ?
                wishList.map((wishItem) => blogInstance.get(`/api/articles/${wishItem.itemId}?populate=image`).then(res => res.data?.data)) :
                [])
        } else {
            wishedProducts = await Promise.all(
                wishList ? wishList.map(item => storeInstance
                    .get(`/products/${item.itemId}`)
                    .then((res)=> res.data
                    )) : []
            )
        }
        return res.status(200).json(wishedProducts)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})

router.post("/:slug", isLoggedIn, async (req,res) => {
    try {
        const slug= req.params.slug.trim().toLowerCase()
        console.log("createInto ", slug,"id:",req.query.id)
        const wishedItem = await wishListSchema.findOne({
            userId: req.user._id,
            itemId: req.query.id,
            isProduct: slug === "product",
            isBlog: slug === "blog"
        })
        let wishItem;
        if(wishedItem){
            wishItem = await wishListSchema.remove(wishedItem)
        } else {
            wishItem = await wishListSchema.create({
                userId: req.user._id,
                itemId: req.query.id,
                isProduct: slug === "product",
                isBlog: slug === "blog"
            })
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