const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  googleId: String,
  userName: {
    type: String,
    trim: true
  },
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
  height: {
    value: {
      type: Number
    },
    unit: {
      type: String,
      enum: ["cm","inch","ft"],
      default: "cm"
    }
  },
  weight: {
    value: {
      type: Number
    },
    unit: {
      type: String,
      enum: ["kg","lbs"],
      default: "kg"
    }
  },
  diabetesType: String,
  carbsRatio: {
    type: Number,
    default: 190
  },
  bodyFatPercentage: {
    type: Number,
    default: 16
  },
  insulinSensitivity: {
    value: {
      type: Number,
      default: 40
    },
    unit: {
      type: String,
      enum: ["mg/1ui","mmol/1ui"],
      default: "mg/1ui"
    }
  },
  hb1ac: {
    type: Number,
    default: 16
  },
  hyperglycemia: {
    min: {
      type: Number,
      default: 181
    },
    max: {
      type: Number,
      default: 600
    }
  },
  normalBloodGlucose: {
    min: {
      type: Number,
      default: 70
    },
    max: {
      type: Number,
      default: 180
    }
  },
  hypoglycemia :{
    min: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: 69
    }
  },
  unit: {
    type: String,
    default: "mg/dL"
  },
  medications: [
      {
        brand: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "medications"
        },
        actingTime: String,
        color: {
          type: String,
          enum: ["orange","red","blue","purple","grey"]
        }
      }
  ],
  password: String,
  darkMode: {
    type: Boolean,
    default: false
  },
  newUser: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});

module.exports = mongoose.model("userSchema", userSchema);
