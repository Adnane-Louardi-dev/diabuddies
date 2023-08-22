const mongoose = require("mongoose");


module.exports = {
    gamificationSchema: mongoose.model("gamificationSchema", mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        level: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "levelSchema"
        },
        points: {
            type: Number,
            required: true,
            default: 0
        },
    }))
}