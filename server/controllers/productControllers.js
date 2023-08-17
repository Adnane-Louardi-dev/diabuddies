const {strapiInstance} = require("../middlewares/blogAxios")
const {productQuery} = require("../util/baseQueries")
const getProduct = async (req,res) => {
    try {
        const productId = req.params.productId
        const {data:product} = await strapiInstance.get(`/api/products/${productId}?${productQuery}`)
        return res.status(201).json(product)
    } catch (e) {
        return res.status(404).json({message: "Cannot find this product"})
    }
}

const getProducts = async (req,res,query="") => {
    try {
        const url = `/api/products?${productQuery}${query}`
        console.log("url ", url)
        const result = await strapiInstance.get(url)
        return res.status(200).json(result.data)
    } catch (e) {
        console.log(e)
        return res.status(404).json({message: "Cannot find any product",...e})
    }
}

module.exports = {getProduct, getProducts}