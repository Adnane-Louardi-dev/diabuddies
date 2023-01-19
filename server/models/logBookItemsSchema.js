const mongoose = require("mongoose");

const logBookItemsSchema = mongoose.Schema({
  time: String,
  glucose: Number,
  meal: String,
  fastActingInsulinUnits: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
});
module.exports = mongoose.model("logBookItemsSchema", logBookItemsSchema);
