const express = require("express")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const {getCart, getCurrentUserCart, updateCart, createCustomerController} = require("../controllers/cartControllers");
const {getProduct, getProducts} = require("../controllers/productControllers");
const {getProductsInCategory, getCategories} = require("../controllers/categoriesControllers");
const qs = require("qs");
const {checkoutOrder, getCurrentUserOrders} = require("../controllers/orderControllers");
const {getCitiesAvailableForShipping} = require("../controllers/cityController");
const router = express.Router();


router.get("/orders",isLoggedIn,getCurrentUserOrders)
router.get("/carts/:cartId", getCart)
router.post("/carts", updateCart)
router.post("/checkout",isLoggedIn,checkoutOrder)
router.get("/product/:productId",isLoggedIn, getProduct)
router.get("/products",isLoggedIn, (req,res)=>{
    return getProducts(req,res)
})
router.get("/products/:limit",isLoggedIn, (req,res) =>{
    return getProducts(req,res,`&pagination[start]=0&pagination[limit]=${req.params.limit}`)
} )
router.get("/categories/:category_slug",isLoggedIn, getProductsInCategory)
router.get("/categories",isLoggedIn, getCategories)
router.post("/customer",isLoggedIn, createCustomerController)
router.get("/cities", getCitiesAvailableForShipping)


module.exports = router