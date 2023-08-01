const {Schema, model} = require("mongoose");
const Popualte = require("../util/autopopulate")
const commentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },
    article: {
        type: String,
        required: true
    },
    content: {
        type: String,
        maxLength: 1500,
        required: true,
    },
    isReported: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isReply: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "commentSchema"
    }]
}, {timestamps: true})

commentSchema.pre("findOne",Popualte("comments"))
    .pre("find", Popualte("comments"))
    .pre("findOne",Popualte("user"))
    .pre("find", Popualte("user"))


module.exports = model("commentSchema", commentSchema)