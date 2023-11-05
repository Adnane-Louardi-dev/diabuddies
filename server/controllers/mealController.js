const { mealSchema } = require("../models/mealSchema");

const addNewMeal = async (req, res) => {
  try {
    const { mealName, unit, glucose, time: whenEated, bolus, basal, carbs, protein, fat, kcal, foods } = req.body;
    const meal = await mealSchema.create({
      userId: req.user._id,
      mealName,
      unit,
      glucose,
      whenEated,
      bolus,
      basal,
      carbs,
      protein,
      fat,
      kcal,
      foods
    });
    await meal.save();
    return res.status(200).json(meal);
  } catch (e) {
    return res.status(404).json({ message: "Didn't create the meal", error: e });
  }
};
const getUserMeals = async (req, res) => {
  try {
    const meals = await mealSchema.find({
      userId: req.user._id,
    });
    return res.status(200).json(meals);
  } catch (e) {
    return res.status(404).json({ message: "Didn't create the meal" });
  }
};

module.exports = { addNewMeal, getUserMeals };
