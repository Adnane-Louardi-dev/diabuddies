const express = require("express")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const {getUserGamification, createGamification,getUserActions} = require("../controllers/gamifyControllers");
const router = express.Router();

router.get("/",isLoggedIn,getUserGamification)
router.get("/actions",isLoggedIn,getUserActions)
router.post("/",isLoggedIn,createGamification)

module.exports = {
    gamifyRouter: router
}