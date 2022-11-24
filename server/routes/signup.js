const express = require("express");
const userSchema = require("../models/userSchema");

const router = express.Router();

// import all controllers

// Add routes
router.get("/", (req, res) => {
  res.json({ message: "signup page" });
});
router.post("/", async (req, res) => {
  const newUser = new userSchema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedNewUser = await newUser.save();
    res.json(savedNewUser);
  } catch (e) {
    console.log(e);
  }
});
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = router;
