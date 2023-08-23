const mongoose = require("mongoose");

module.exports = {
  levelsSchema: mongoose.model(
    "levelSchema",
    mongoose.Schema({
      levelName: {
        type: String,
        required: true,
      },
      level: {
        type: Number,
      },
      minPoints: {
        type: Number,
        required: true,
      },
      maxPoints: {
        type: Number,
        required: true,
      },
      nextLevel: mongoose.Schema.Types.ObjectId,
    })
  ),
};
