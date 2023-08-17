const {strapiInstance} = require("../middlewares/blogAxios");
const userSchema = require("../models/userSchema");


const createCustomer = async (customer) => {
    try {
        const {givenName, familyName, phoneNumber, email, homeAddress,birthdate,cityId} = customer

        const postData = JSON.stringify({
            name: givenName + " " + familyName,
            phoneNumber,
            email,
            birthdate,
            address: homeAddress,
            city: cityId
        })
        const {data:createdCustomer} = await strapiInstance.post("/api/customers",{
            "data": JSON.parse(postData)
        })
        const user = await userSchema.findByIdAndUpdate(customer._id,{customerId: createdCustomer.data.id},{new:true})
        await user.save()
        return createdCustomer.data
    } catch (e) {
        console.error("cannot create the customer", e.message)
        return null
    }
}

module.exports = {createCustomer}