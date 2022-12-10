require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const profileRoute = require("./routes/profile");
const signup = require("./routes/signup");
const session = require("express-session");
const passport = require("passport");
const login = require("./routes/login");
const app = express();

//DB connect
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgq8q.mongodb.net/?retryWrites=true&w=majority&ssl=true`, () =>
  console.log("DB connected!")
);

//middleswares
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    maxAge: new Date(Date.now() + 3600000 * 5), //5 Hours
    expires: new Date(Date.now() + 3600000 * 24), //24 Hours
  })
);
app.use(passport.session());
app.use(passport.initialize());
app.use("/login", login);
app.use("/profile", profileRoute);
app.use("/signup", signup);

//ensure that user is log in
const isLoggedIn = (req, res, next) => {
  // req.user ? next() : res.redirect("/login");
  req.user ? next() : res.redirect("http://localhost:3001/login");
};
//
app.get("/", (req, res) => {
  res.json({ user: req.user });
});
app.get("/dashboard", (req, res) => {
  res.json({ message: `hi ${req.user.name.givenName}` });
});
app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
