require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const morgan = require("morgan");
const login = require("./routes/login");
const signup = require("./routes/signup");
const profileRoute = require("./routes/profile");

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
app.use(morgan("tiny"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    httpOnly: false, //if it true the client can't see the cookie in document.cookie in diabuddies
    maxAge: null,
    cookie: { secure: false }, //if it true the client can't send the cookie back to the server if the browser don't support HTTPS
    // store:MongoStore.create({mongoUrl:}),
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
  req.user ? next() : res.redirect("http://localhost:3000/login/auth/google");
};
//
app.get("/", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "auth", user: req.user, locals: res.locals.user });
  } else {
    res.status(401).json({ message: "no auth" });
  }
  console.log(`locals ${res.user}`);
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
