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
    itemType: {
        type: String,
        required: true,
        enum: ["blog","recipe","product"]
    }
})


module.exports = model("wishListSchema", wishListSchema)