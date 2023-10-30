const express = require("express");
const crypto = require("crypto");
const passport = require("passport");
const userSchema = require("../models/userSchema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { diabeticDetailsSchema } = require("../models/diabeticDetailsSchema");
const { gamificationSchema } = require("../models/gamificationSchema");
const { levelsSchema } = require("../models/levelsSchema");

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
      userSchema.findOne({ googleId: profile.id }, async function (err, user) {
        //create a new user if the user doesn't exist in the DB
        if (!user) {
          const createdUser = new userSchema({
            googleId: profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
          await diabeticDetailsSchema.create({
            userId: createdUser._id,
          });
          const level = await levelsSchema.findOne({ level: 1 });
          await gamificationSchema.create({
            user: createdUser._id,
            level: level._id,
          });
          createdUser.save((err, newUser) => cb(err, newUser));
        } else {
          return cb(err, user);
        }
      });
    }
  )
);
//facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "702785861413449",
      clientSecret: "9ecbccb72428e18b5f2cda6db9147a05",
      callbackURL: `${process.env.BACKEND_URL}/login/oauth2/redirect/facebook`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      userSchema.findOne({ googleId: profile.id }, async function (err, user) {
        console.log(profile, cb);
        //create a new user if the user doesn't exist in the DB
        if (!user) {
          const createdUser = new userSchema({
            facebookId: profile.id,
            givenName: profile.displayName.split(" ")[0],
            familyName: profile.displayName.split(" ")[1],
          });
          await diabeticDetailsSchema.create({
            userId: createdUser._id,
          });
          const level = await levelsSchema.findOne({ level: 1 });
          await gamificationSchema.create({
            user: createdUser._id,
            level: level._id,
          });
          createdUser.save((err, newUser) => cb(err, newUser));
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
router.get("/auth/google/callback", passport.authenticate("google", { successRedirect: `${process.env.FRONTEND_URL}/app`, failureRedirect: `${process.env.FRONTEND_URL}/login` }));
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);
router.get("/oauth2/redirect/facebook", passport.authenticate("facebook", { successRedirect: `${process.env.FRONTEND_URL}/app`, failureRedirect: `${process.env.FRONTEND_URL}/login` }));


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
