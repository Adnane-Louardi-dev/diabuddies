const express = require("express");
const router = express.Router();
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const moment = require("moment");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const {getLogBook, addNewLog, deleteLog} = require("../controllers/logbookController");
const {getUserMeals, addNewMeal} = require("../controllers/mealController");

router.get("/meals", isLoggedIn, getUserMeals);
router.post("/meal", isLoggedIn, addNewMeal);

router.get("/", isLoggedIn, getLogBook);
router.post("/", [isLoggedIn, validate(validation.dialogValidation)], addNewLog);
// DELETE a log by ID
router.delete("/", isLoggedIn, deleteLog);
module.exports = router;
