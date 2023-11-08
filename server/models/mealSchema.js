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
  glucose: Number,
  meal: String,
  carbs: Number,
  protein: Number,
  fat: Number,
  kcal: Number,
  foods: {
    products: Array,
    recipes: Array,
    nutritions: Array
  }
});
module.exports = mongoose.model("mealSchema", mealSchema);
