const userSchema = require("../models/userSchema")
const {createCustomer} = require("../services/customerServices");

const getUserCustomerId = async (user) => {
    let u = await userSchema.findById(user._id);
    if(!u){
        u = await createCustomer(user)
        return u.id
    } else{
        return u.customerId
    }
}


module.exports = {getUserCustomerId}