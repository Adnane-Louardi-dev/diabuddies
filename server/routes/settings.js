const express = require("express");
const userSchema = require("../models/userSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "settings" });
});

router.post("/addMedicament", async (req, res) => {
  console.log("heeeey")
  try {
    const userId = req.user._id;
    const user = await userSchema.findById(userId);
    user.medications = [...user.medications, req.body]
    await user.save()
    return res.status(201).json(user.medications)
  } catch (e) {
    console.error(e)
    return res.status(404).json({msg: e})
  }
});

module.exports = router;
