const joi = require("joi");
//logBook dialog validation
module.exports = {
  dialogValidation: joi.object().keys({
    time: joi.date().required(),
    status: joi.string(),
    unit: joi.string(),
    glucose: joi.number().integer().min(0),
    meal: joi.string().required(),
    bolus: joi.number(),
    basal: joi.number(),
    carbs: joi.number(),
    protein: joi.number(),
    fat: joi.number(),
    kcal: joi.number(),
    foods: joi.object({
      products: joi.array(),
      recipes: joi.array(),
      nutritions: joi.array()
    }),
    _id: joi.string()
  }),
  diabetecDetailsValidation: joi.object().keys({
    birthDate: joi.date(),
    gender: joi.string().valid("male", "female"),
    height: joi.object().keys({
      value: joi.number(),
      unit: joi.string().valid("cm", "inch", "ft")
    }),
    weight: joi.object().keys({
      value: joi.number(),
      unit: joi.string().valid("kg", "lbs")
    }),
    diabetesType: joi.string().valid("typeOne", "typeTwo", "other"),
    carbsRatio: joi.number(),
    bodyFatPercentage: joi.number(),
    insulinSensitivity: joi.object().keys({
      value: joi.number(),
      unit: joi.string().valid("mg/dL/1ui", "mmol/L/1ui")
    }),
    hb1ac: joi.object().keys({
      value: joi.number(),
      unit: joi.string().valid("IFCC", "DCCT")
    }),
    hyperglycemia: joi.object().keys({
      min: joi.number(),
      max: joi.number()
    }),
    normalBloodGlucose: joi.object().keys({
      min: joi.number(),
      max: joi.number()
    }),
    hypoglycemia: joi.object().keys({
      min: joi.number(),
      max: joi.number()
    }),
    unit: joi.string().valid("mmol/l", "mg/dL"),
    medications: joi.array(),
    dailyCaloriesNeeds: joi.number()
  })
}
