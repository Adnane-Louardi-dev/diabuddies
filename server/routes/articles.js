const express = require("express");
const {strapiInstance} = require("../middlewares/blogAxios");
const router = express.Router();
const commentSchema = require("../models/commentSchema")
const qs = require("qs")
router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params
        console.log("id",id,req.params)
        const query = qs.stringify(
            {
                populate: {
                    image:true,
                    categories: true,
                    author: {
                        populate: ["avatar"]
                    }
                }
            }
        )
        const {data} = await strapiInstance.get(`/api/articles/${id}?${query}`)
        const article = {id: data.data.id, ...data.data.attributes}
        article.image = article.image.data ? article.image.data.attributes : null
        article.author = article.author.data ? article.author.data.attributes : null
        article.categories = article.categories.data ? article.categories.data.map((category)=> ({id:category.id,...category.attributes})) : []
        if(article.author){
            article.author.avatar = article.author.avatar.data ?  article.author.avatar.data.attributes : null
        }
        const relatedTopicsFilter =
            article.categories.length > 0 ?
                {
                    categories: {
                        name: {
                            $eq: article.categories[0].name
                        }
                    }
                } : {
                author: {
                    id: article.author?.id
                }
            }
        const relatedArticles = await strapiInstance.get(`/api/articles?${
            qs.stringify({
                filters: relatedTopicsFilter,
                populate: ["image"],
                pagination: {
                    pageSize: 4,
                    page:1
                }
            })
        }`).then((res)=>{
            return res.data.data
        }).catch(() => {
            return []
        })
        article.relatedArticles = relatedArticles
        return res.status(200).json(article)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})


module.exports = router