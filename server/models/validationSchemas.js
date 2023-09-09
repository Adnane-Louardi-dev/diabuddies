const joi = require("joi");
//logBook dialog validation
exports.dialogValidation = joi.object().keys({
  time: joi.date().required(),
  status: joi.string(),
  unit: joi.string(),
  glucose: joi.number().integer().min(0).max(700),
  meal: joi.string().required(),
  bolus: joi.number(),
  basal: joi.number(),
  carbs: joi.number(),
  protein: joi.number(),
  fat: joi.number(),
  kcal: joi.number(),
  food: joi.array(),
});
