const {Schema, model} = require("mongoose");

const orderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    cartId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    shippingAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/,"Please fill a valid phone number"]
    },
    hostedUrl: {
        type: String,
        required: true
    },
    cart: {
        type: String,
        required: true
    }
})


module.exports = model("orderSchema", orderSchema)