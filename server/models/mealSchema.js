const mongoose = require("mongoose");
const {Mongoose, Schema} = require("mongoose");

module.exports = {
    mealSchema: mongoose.model("mealSchema", mongoose.Schema({
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        mealName: {
            type: String,
            required: true
        },
        whenEated: String,
        unit: String,
        glucose: Number,
        meal: String,
        bolus: Number,
        basal: Number,
        carbs: Number,
        protein: Number,
        fat: Number,
        kcal: Number,
    }))
};
