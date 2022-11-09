import { Router } from "express";
import userSchema from "../models/userSchema";

const router = new Router();

// import all controllers
// import SessionController from './app/controllers/SessionController';

// Add routes
// routes.get('/', SessionController.store);
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
