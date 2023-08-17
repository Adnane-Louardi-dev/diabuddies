const qs = require("qs");
const {strapiInstance} = require("../middlewares/blogAxios");
const userSchema = require("../models/userSchema")
const {createCustomer} = require("../services/customerServices");
const {getCurrentCart, createCart} = require("../services/cartService");
const getCurrentUserCart = async (req,res) =>{
    try {
        let cart = await getCurrentCart(req.user, req.body.id)
        console.log("get cart", cart)
        if(!cart){
            cart = await createCart(req.user)
            console.log("create cart", cart)
        }
        return res.status(200).json(cart);
    } catch (e) {
        return res.status(404).json({message: "cannot find carts of this user"})
    }
}
const getCart = async (req,res) =>{
    try {
        const customerId = req.user.customerId;
        const cart = await strapiInstance.get(`/api/carts/${req.params.cartId}`);
        if(cart.customer !== customerId){
            throw new Error("This cart doesn't belong to current user>")
        }
        return res.status(200).json(cart);
    } catch (e) {
        return res.status(404).json({message: "Cannot find carts of this user"})
    }
}


const updateCart = async (req,res) => {
    try {
        const cart = await getCurrentCart(req.user, req.body.id)
        let {venteEntries} = req.body;

        venteEntries = venteEntries.map(async ({quantity,productId}) => {
            const product =  await strapiInstance(`/api/products/${productId}`)
            const total = product.price * quantity;
            // const subtotal, discount  //TODO
            const {data: venteEntry} = await strapiInstance.post("/api/vente-entries",{
                total,
                product,
                quantity
            })
            return venteEntry
        })
        const updatedVenteEntries = [venteEntries, ...cart.data.attributes.venteEntries]
        const cartDetails = JSON.stringify({
            data: {
                ...calculationService(updatedVenteEntries),
                venteEntries: updatedVenteEntries.map(venteEntry => venteEntry.id)
            }
        })
        const updatedCart = await strapiInstance.put(`/api/carts/${cart.id}?populate=*`,JSON.parse(cartDetails))
        return res.status(200).json(updatedCart)
    } catch (e) {
        res.status(404).json({message: "Cannot create a new cart"})
    }
}


const createCustomerController = async (req,res) => {
    const customer = await createCustomer(req.user)
    if(customer){
        return res.status(200).json(customer)
    }
    return res.status(404).json({message: "Cannot create"})
}



module.exports = {getCart, getCurrentUserCart, updateCart, createCustomerController}