const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, lowercase: true, trim: true },
  lastName: { type: String, lowercase: true, trim: true },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
  password: { type: String },
  bio: String,
  age: { type: Number, min: 18 },
  height: Number,
  weight: Number,
  birthDate: Date,
  diabetesType: String,
  hb1ac: String,
  updateAt: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("userSchema", userSchema);