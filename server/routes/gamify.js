const express = require("express")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const {getUserGamification, createGamification,getUserActions, getLeaderboard} = require("../controllers/gamifyControllers");
const router = express.Router();

router.get("/",isLoggedIn,getUserGamification)
router.get("/actions",isLoggedIn,getUserActions)
router.get("/leaderboard",isLoggedIn,getLeaderboard)
router.post("/",isLoggedIn,createGamification)

module.exports = {
    gamifyRouter: router
}