const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");

//gets all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await userSchema.find();
    res.json(profiles);
    console.log(profiles);
  } catch (err) {
    console.log(err);
  }
});

//get specefic profile
router.get("/:profileId", async (req, res) => {
  const profiles = await userSchema.findOne({ _id: req.params.profileId });
  res.json(profiles);
});

module.exports = router;
