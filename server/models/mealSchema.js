const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const mealSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  mealName: {
    type: String,
    required: true,
  },
  whenEated: Date,
  unit: String,
  glucose: Number,
  meal: String,
  bolus: Number,
  basal: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  kcal: Number,
});
module.exports = mongoose.model("mealSchema", mealSchema);
