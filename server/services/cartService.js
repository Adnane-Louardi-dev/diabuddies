const {strapiInstance} = require("../middlewares/blogAxios");
const {createCustomer} = require("./customerServices");
const {randomUUID} = require("crypto");
const {getUserCustomerId} = require("../controllers/customerControllers");


const getCurrentCart = async (customer, prospectId) => {
    if(!customer && !prospectId){
        return null
    }
    let url,
        customerId = await getUserCustomerId(customer._id);
    console.log("customer Id", customerId, "customer",customer)
    if(!customerId && !prospectId){
        return null
    }
    if(customerId){
        url = `/api/carts?populate=*&filters[customer][id][$eq]=${customerId}`
    } else {
        url = `/api/carts/?populate=*&filters[prospectId][$eq]=${prospectId}`
    }
    console.log("url ", url)
    return await strapiInstance.get(url)
        .then((res)=>{
           return  res.data
        }).catch(()=>null)
}


const createCart = async (customer) => {
    let customerId
    if(customer) {
        customerId = await getUserCustomerId(customer._id);
        console.log("customer id", customerId)
        if(!customerId){
            const newCustomer = await createCustomer(customer);
            customerId = newCustomer?.customerId
        }
        return await strapiInstance.post("api/carts/?populate=*",{
           "data": {
               "total": 0,
               "subtotal":0,
               "discount": 0,
               "totalItems": 0,
               "customer": {
                   "set": customerId
               }
           }
        }).then((res)=>{
            return res.data
        }).catch(() => null)
    } else {
        customerId = randomUUID()
        console.log("customer id", customerId)
        return await strapiInstance.post("api/carts/?populate=*",{
            "data": {
                "total": 0,
                "subtotal":0,
                "discount": 0,
                "totalItems": 0,
                "prospectId": {
                    "set": customerId
                }
            }
        }).then((res)=>{
            return res.data
        }).catch(()=>null)
    }
}

module.exports = {getCurrentCart,createCart}