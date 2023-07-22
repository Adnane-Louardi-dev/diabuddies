const {Schema, model} = require("mongoose");

const wishListSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
})


module.exports = model("wishListSchema", wishListSchema)