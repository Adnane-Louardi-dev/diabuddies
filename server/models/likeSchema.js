const mongoose = require("mongoose");

module.exports = {
    likeSchema: mongoose.model("likesSchema",mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        articleId: String,
    }))
}