const mongoose = require("mongoose");


module.exports = {
    gamificationSchema: mongoose.model("gamificationSchema", mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userSchema",
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
        dailyLogInClaimed: Boolean
    }))
}