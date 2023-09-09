const userSchema = require("../models/userSchema")
const {createCustomer} = require("../services/customerServices");

const getUserCustomerId = async (user) => {
    let u = await userSchema.findById(user._id);
    if (!u.customerId) {
        u = await createCustomer(user)
        return u.id
    }
    return u.customerId
}


module.exports = {getUserCustomerId}