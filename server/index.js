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
const settings = require("./routes/settings");
const logbook = require("./routes/logbook");
const userRoutes = require("./routes/userRoutes");
const user = require("./routes/user");

//DB connect
const DBConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgq8q.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
mongoose.connect(DBConnection, () => console.log("DB connected!"));

//middleswares
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    httpOnly: false, //if it true the client can't see the cookie in document.cookie in diabuddies
    maxAge: null,
    cookie: { secure: false }, //if it true the client can't send the cookie back to the server if the browser don't support HTTPS
    store: MongoStore.create({ mongoUrl: DBConnection, ttl: 20 * 24 * 60 * 60 }), //20 days
  })
);
app.use(passport.session());
app.use(passport.initialize());
// app.use(isLoggedIn);
app.use("/login", login);
app.use("/logbook", logbook);
app.use("/settings", settings);
app.use("/users", user);
app.use("/", userRoutes);
//ensure that user is log in

//get the objectId from time stamp
const objectIdFromDate = function (date) {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

//get time from time stamp of objectid
const dateFromObjectId = function (objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};


app.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
