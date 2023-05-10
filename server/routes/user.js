const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");

//get user data
router.get("/me", async (req, res) => {
  try {
    const user = await userSchema.findById(req.user._id);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(404).json({ msg: e });
  }
});

//update user settings and return the updated data
router.post("/", async (req, res) => {
  try {
    const changedData = req.body;
    userSchema
      .updateOne({ _id: req.user._id }, { $set: changedData })
      .then(async () => {
        const user = await userSchema.findById(req.user._id);
        return res.json({ user });
      })
      .catch((err) => res.json(err));
  } catch (e) {
    console.error(e);
    return res.json({ msg: e });
  }
});

//add medicament to user's medicaments array
router.post("/addMedicament", async (req, res) => {
  console.log("heeeey");
  try {
    const userId = req.user.id;
    const user = await userSchema.findById(userId);
    user.medications = [...user.medications, req.body];
    await user.save();
    return res.status(201).json(user.medications);
  } catch (e) {
    console.error(e);
    return res.json({ msg: e });
  }
});
module.exports = router;
