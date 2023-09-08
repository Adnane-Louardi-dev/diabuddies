const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");
const { updateUser, addMedicament, getMe, updateDiabetecDetails, setupProfile, getMeDetailed } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

//get user data
router.get("/me", isLoggedIn, getMe);
router.get("/diabetecDetails", isLoggedIn, getMeDetailed);
router.post("/diabetecDetails", isLoggedIn, setupProfile);
router.put("/diabetecDetails", isLoggedIn, updateDiabetecDetails);

//update user settings and return the updated data
router.post("/", isLoggedIn, updateUser);

//add medicament to user's medicaments array
router.post("/addMedicament", isLoggedIn, addMedicament);
module.exports = router;
