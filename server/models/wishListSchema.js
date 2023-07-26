const {Schema, model} = require("mongoose");

const wishListSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    isProduct: {
        type: Boolean,
        required: true,
        default: false
    },
    isBlog: {
        type: Boolean,
        required: true,
        default: false
    },
})


module.exports = model("wishListSchema", wishListSchema)