const mongoose = require("mongoose");

const logBookItemsSchema = mongoose.Schema({
  userId: String,
  time: Date,
  status: String,
  unit: String,
  glucose: Number,
  meal: String,
  fastActingInsulinUnits: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
});
module.exports = mongoose.model("logBookItemsSchema", logBookItemsSchema);
