const mongoose = require("mongoose");

module.exports = {
    diabetecDetailsSchema: mongoose.model("diabetecDetailsSchema",mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        birthDate: Date,
        gender: String,
        height: {
            value: {
                type: Number,
            },
            unit: {
                type: String,
                enum: ["cm", "inch", "ft"],
                default: "cm",
            },
        },
        weight: {
            value: {
                type: Number,
            },
            unit: {
                type: String,
                enum: ["kg", "lbs"],
                default: "kg",
            },
        },
        diabetesType: String,
        carbsRatio: {
            type: Number,
        },
        bodyFatPercentage: {
            type: Number,
        },
        insulinSensitivity: {
            value: {
                type: Number,
                default: 40,
            },
            unit: {
                type: String,
                enum: ["mg/dL/1ui", "mmol/L/1ui"],
                default: "mg/dL/1ui",
            },
        },
        hb1ac: {
            value: {
                type: Number,
            },
            unit: {
                type: String,
                //DCCT = 0,0915 x IFCC + 2,15
                enum: ["IFCC", "DCCT"],
                default: "IFCC",
            },
        },
        hyperglycemia: {
            min: {
                type: Number,
                default: 181,
            },
            max: {
                type: Number,
                default: 600,
            },
        },
        normalBloodGlucose: {
            min: {
                type: Number,
                default: 70,
            },
            max: {
                type: Number,
                default: 180,
            },
        },
        hypoglycemia: {
            min: {
                type: Number,
                default: 20,
            },
            max: {
                type: Number,
                default: 69,
            },
        },
        unit: {
            type: String,
            //To convert mmol/l to mg/dl you have to multiply by 18. To convert mg/dl to mmol/l you have to divide by 18.
            enum: ["mmol/l", "mg/dL"],
            default: "mg/dL",
        },
        medications: [
            {
                brand: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "medications",
                },
                actingTime: String,
                color: {
                    type: String,
                    enum: ["orange", "red", "blue", "purple", "grey"],
                },
            },
        ],
        dailyCaloriesNeeds: Number,
    }))
}