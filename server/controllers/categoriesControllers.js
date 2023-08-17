const {strapiInstance} = require("../middlewares/blogAxios")

const getCategory = async (req,res) => {
    try {
        const categoryId = req.params.categoryId
        const {data:category} = await strapiInstance.get(`/api/store-categories/${categoryId}`)
        return res.status(201).json(category)
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

module.exports = {getCategory, getCategories}