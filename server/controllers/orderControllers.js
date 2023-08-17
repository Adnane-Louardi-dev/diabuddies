const {strapiInstance} = require("../middlewares/blogAxios");
const {getUserCustomerId} = require("./customerControllers");
const {createCart, getCurrentCart} = require("../services/cartService");
const userSchema = require("../models/userSchema")
const {cartCalculationService} = require("../util/calculationService");
const {orderQuery} = require("../util/baseQueries");
const checkoutOrder = async (req,res) => {
  try {
      const customerId = await getUserCustomerId(req.user)
      const {phoneNumber, shippingAddress, email, customerName, cityId, venteEntries} = req.body;
      const productIds = venteEntries.map(entry => entry.productId)
      const url = `/api/products?${
          productIds.map((productId,idx) => `filters[id][$in][${idx}]=${productId}`)
              .join("&")
      }`
      const {data:products} = await strapiInstance.get(url)
      const initialOrder = JSON.stringify({
          data: {
              customer: customerId,
              status: "NEW",
              phoneNumber,
              address: shippingAddress,
              email,
              customerName,
              total: 0,
              subtotal: 0,
              discount: 0,
              totalItems: 0,
              city: cityId
          }
      })
      console.log("init order ", JSON.stringify(JSON.parse(initialOrder),null,2))
      const {data:order} = await strapiInstance.post("/api/orders",JSON.parse(initialOrder))
      const entries = await Promise.all(venteEntries.map((entry)=>{
          const product = products.data.find((p)=>p.id === entry.productId)
              total = product.attributes.selling_price * entry.quantity,
              subtotal = product.attributes.original_price * entry.quantity;
          const entryCreation = JSON.stringify({
              data: {
                  product: product.id,
                  total: total,
                  subtotal: subtotal,
                  discount: subtotal - total,
                  quantity: entry.quantity,
                  cart: order.data.id
              }
          })
          return strapiInstance.post("/api/vente-entries",JSON.parse(entryCreation))
              .then((res)=>res.data.data)
      }))


      const orderUpdating = JSON.stringify({
          data: {
              ...cartCalculationService(entries.map(entry => entry.attributes)),
              vente_entries: {
                  set: entries.map(entry => entry.id)
              }
          }
      })
      const {data:updatedOrder} = await strapiInstance.put(`/api/orders/${order.data.id}`,JSON.parse(orderUpdating))
      return res.status(200).json(updatedOrder)
  } catch (e) {
      console.error(e.message)
      return res.status(404).json({message: "There was an error creating the order",...e})
  }
}

const getCurrentUserOrders = async (req,res) =>{
    try {
        let user = await userSchema.findById(req.user._id)
        if(!user.customerId){
            return res.status(201).json([])
        }
        const {data:orders} = await strapiInstance.get(
            `/api/orders?${orderQuery}&filters[customer][id][$eq]=${user.customerId}`
        )
        return res.status(200).json(orders);
    } catch (e) {
        return res.status(404).json({message: "cannot find carts of this user"})
    }
}

module.exports = {getCurrentUserOrders, checkoutOrder}