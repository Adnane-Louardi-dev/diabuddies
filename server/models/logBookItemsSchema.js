const mongoose = require("mongoose");

const logBookItemsSchema = mongoose.Schema({
  userId: String,
  time: Date,
  status: String,
  unit: String,
  glucose: Number,
  meal: String,
  bolus: Number,
  basal: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  kcal: Number,
  foods: {
    products: Array,
    recipes: Array,
    nutritions: Array
  },
});
module.exports = mongoose.model("logBookItemsSchema", logBookItemsSchema);
