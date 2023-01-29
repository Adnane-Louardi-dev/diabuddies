const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  googleId: String,
  givenName: { type: String, lowercase: true, trim: true },
  familyName: { type: String, lowercase: true, trim: true },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
  photo: String,
  bio: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  diabetesType: String,
  hb1ac: String,
  newUser: { type: Boolean, default: true },
  createdAt: { type: String, default: new Date() },
  updateAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("userSchema", userSchema);
