const express = require("express");
const passport = require("passport");
const userSchema = require("../models/userSchema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_KEY,
      callbackURL: "http://localhost:3000/login/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      userSchema.findOne({ googleId: profile.id }, function (err, user) {
        //create a new user if the user doesn't exist in the DB
        if (!user) {
          new userSchema({
            googleId: profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
          }).save((err, newUser) => {
            return cb(err, newUser);
          });
        } else {
          console.log(accessToken);
          console.log(refreshToken);
          return cb(err, user);
        }
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { successRedirect: "http://localhost:3001/", failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
module.exports = router;
