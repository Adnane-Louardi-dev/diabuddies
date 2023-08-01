const express = require("express");
const passport = require("passport");
const userSchema = require("../models/userSchema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
var crypto = require("crypto");

const router = express.Router();
//local strategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    userSchema.findOne({ userName: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
router.post("/", passport.authenticate("local", { failureRedirect: `/login` }), function (req, res) {
  res.json(req.user);
});
//google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_KEY,
      callbackURL: `${process.env.BACKEND_URL}/login/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      userSchema.findOne({ googleId: profile.id }, function (err, user) {
        //create a new user if the user doesn't exist in the DB
        if (!user) {
          new userSchema({
            googleId: profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          }).save((err, newUser) => {
            return cb(err, newUser);
          });
        } else {
          return cb(err, user);
        }
      });
    }
  )
);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { successRedirect: process.env.FRONTEND_URL, failureRedirect: `${process.env.FRONTEND_URL}/login` })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
