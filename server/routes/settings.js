const express = require("express");
const userSchema = require("../models/userSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "settings" });
});

router.post("/", (req, res) => {
  const data = {
    bio: req.body.bio,
    age: req.body.age,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
    diabetesType: req.body.diabetesType,
    hb1ac: req.body.hb1ac,
    newUser: false,
    updatedAt: new Date(),
  };
  const userId = req.user._id;
  const UpdateSettings = userSchema.insertMany();
});
module.exports = router;
