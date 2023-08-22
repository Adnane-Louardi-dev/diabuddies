const express = require("express")
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const {getUserGamification, createGamification} = require("../controllers/gamifyControllers");
const router = express.Router();

router.get("/",isLoggedIn,getUserGamification)
router.post("/",isLoggedIn,createGamification)

module.exports = {
    gamifyRouter: router
}