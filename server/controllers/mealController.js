const mealModel = require("../models/mealSchema");

const addNewMeal = async (req, res) => {
  try {
    const { mealName, glucose, meal, carbs, protein, fat, kcal, foods } = req.body;
    const createdMeal = await mealModel.create({
      userId: req.user._id,
      mealName,
      glucose,
      carbs,
      protein,
      fat,
      kcal,
      meal,
      foods
    });
    await createdMeal.save();
    return res.status(200).json(createdMeal);
  } catch (e) {
    console.log('e',e)
    return res.status(404).json({ message: "Didn't create the meal", error: e });
  }
};
const getUserMeals = async (req, res) => {
  try {
    const meals = await mealModel.find({
      userId: req.user._id,
    });
    return res.status(200).json(meals);
  } catch (e) {
    return res.status(404).json({ message: "Didn't create the meal" });
  }
};

module.exports = { addNewMeal, getUserMeals };
