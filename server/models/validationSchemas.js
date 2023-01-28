const joi = require("joi");
exports.dialogValidation = joi.object().keys({
  time: joi.string().required(),
  glucose: joi.number().integer().min(0).max(700),
  meal: joi.string().required(),
  fastActingInsulinUnits: joi.number().min(0),
  carbs: joi.number(),
  protein: joi.number(),
  fat: joi.number(),
});
