const {strapiInstance} = require("../middlewares/blogAxios");
const userSchema = require("../models/userSchema");


const createCustomer = async (customer) => {
    try {
        const {customerName, phoneNumber, shippingAddress,cityId} = customer

        const postData = JSON.stringify({
            name: customerName,
            phoneNumber,
            address: shippingAddress,
            city: cityId
        })
        const {data:createdCustomer} = await strapiInstance.post("/api/customers",{
            "data": JSON.parse(postData)
        })
        const user = await userSchema.findByIdAndUpdate(customer._id,{customerId: createdCustomer.data.id},{new:true})
        await user.save()
        return createdCustomer.data
    } catch (e) {
        console.error("cannot create the customer", e)
        return null
    }
}

module.exports = {createCustomer}