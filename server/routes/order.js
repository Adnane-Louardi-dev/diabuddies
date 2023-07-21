const express = require("express")
const router = express.Router();
const orderSchema = require("../models/orderSchema")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
router.get("/", isLoggedIn,async (req,res) => {
    try {
        const orders = await orderSchema.find({userId: req.user._id})
        return res.status(200).json(orders)
    } catch (e) {
        console.error(e)
        return res.status(404).json(e)
    }
})

router.post("/", isLoggedIn, async (req,res) => {
    try {
        const ordered = await orderSchema.findOne({cartId: req.body.cartId})
        if(ordered){
            return res.status(404).json({message: "Order Already Made!"})
        }
        const order = await orderSchema.create({
            userId: req.user._id,
            cartId: req.body.cartId,
            email: req.body.email,
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber,
            hostedUrl: req.body.hostedUrl,
            cart: req.body.cart
        })
        return res.status(200).json(order)
    } catch (e) {
        console.error(e);
        return res.status(404).json(e)
    }
})

router.delete("/", isLoggedIn, async (req,res) => {
    try {
        const order = await orderSchema.findOneAndDelete({cartId: req.body.cartId})
        if(!order){
            return res.json(404).json({message: "This order doesn't exist!"})
        }
        return res.status(200).json(order)
    } catch (e) {
        console.error(e.message)
        return res.status(404).json(e)
    }
})


module.exports = router