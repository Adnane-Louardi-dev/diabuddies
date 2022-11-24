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

//submite profiles
router.post("/", async (req, res) => {
  const profile = new userSchema({
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    diabetesType: req.body.diabetesType,
  });
  try {
    const savedProfile = await profile.save();
    res.json(savedProfile);
  } catch (err) {
    console.log(err);
  }
});

//update a profile
router.patch("/:profileId", async (req, res) => {
  try {
    const updatedProfile = await userSchema.updateOne({ _id: req.params.profileId }, { $set: req.body });
    res.json(updatedProfile);
  } catch (err) {
    console.log(err);
  }
});

//delete a profile
router.delete("/:profileId", async (req, res) => {
  try {
    const removeProfile = await userSchema.deleteOne({ _id: req.params.profileId });
    res.json({ msg: "profile removed" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
