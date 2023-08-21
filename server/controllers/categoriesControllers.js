const {strapiInstance} = require("../middlewares/blogAxios")
const {stringify} = require("qs");
const {productQuery} = require("../util/baseQueries");

const getProductsInCategory = async (req,res) => {
    try {
        const categorySlug = req.params.category_slug
        const query = stringify({
                filters: {
                    store_categories: {
                        slug: {
                            $eq: categorySlug
                        }
                    }
                },
                populate: ["store_categories"]
            })
        console.log("qyerttt ", query)
        const {data:products} = await strapiInstance.get(`/api/products/?${query}&${productQuery}`)
        return res.status(201).json(products)
    } catch (e) {
        return res.status(404).json({message: "Cannot find this category"})
    }
}

const getCategories = async (req,res) => {
    try {
        const {data:categories} = await strapiInstance.get(`/api/store-categories/`)
        return res.status(200).json(categories)
    } catch (e) {
        console.log(e)
        return res.status(404).json({message: "Cannot find any category",...e})
    }
}

module.exports = {getCategories, getProductsInCategory}