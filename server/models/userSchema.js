const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    googleId: String,
    facebookId: String,
    userName: {
      type: String,
      trim: true,
    },
    givenName: { type: String, lowercase: true, trim: true },
    familyName: { type: String, lowercase: true, trim: true },
    age: Number,
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    homeAddress: String,
    cityId: String,
    phoneNumber: {
      type: String,
      match: [/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/, "Please fill a valid phone number"],
    },
    photo: String,
    bio: String,
    diabeticDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diabeticDetailsSchema",
    },
    password: String,
    darkMode: {
      type: Boolean,
      default: false,
    },
    newUser: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    customerId: String,
    profileId: {
      token: String,
      regenerate: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userSchema", userSchema);
