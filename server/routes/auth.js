import { Router } from "express";
import passport from "passport";
import userSchema from "../models/userSchema";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const router = new Router();

router.get("/federated/google", passport.authenticate("google"));

module.exports = router;
