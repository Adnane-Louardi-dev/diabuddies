require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const morgan = require("morgan");
const validation = require("./models/validationSchemas");
const { validate } = require("./middlewares/validationMiddleware");
const login = require("./routes/login");
const profileRoute = require("./routes/profile");
const logBookItemsSchema = require("./models/logBookItemsSchema");
const userSchema = require("./models/userSchema");

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
app.use("/login", login);
app.use("/profile", profileRoute);

//ensure that user is log in
const isLoggedIn = (req, res, next) => {
  // req.user ? next() : res.redirect("/login");
  req.user ? next() : res.sendStatus(401);
};

//get the objectId from time stamp
const objectIdFromDate = function (date) {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

//get time from time stamp of objectid
const dateFromObjectId = function (objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

app.get("/", isLoggedIn, async (req, res) => {
  const timeElapsed = Date.now();
  //time provided by user or default date (today)
  const today = req.query.date ? new Date(req.query.date) : new Date(timeElapsed);
  const todayMax = new Date(today.setHours(23, 59, 59, 999)) + 1;
  const todayMin = new Date(today.setHours(0, 0, 0, 0)) + 1;
  // const reqDate = today.toISOString().substring(0, 10);
  // console.log(today);
  // console.log(todayMax.toString());
  // console.log(todayMin.toString());

  //get the logs of specific day
  const logs = await logBookItemsSchema
    .find({
      userId: req.user._id,
      time: { $gte: todayMin.toString(), $lt: todayMax.toString() },
    })
    // descending sorting
    .sort({ time: -1 });

  res.status(200).json({
    user: req.user,
    logBook: logs,
  });
});

app.post("/", [isLoggedIn, validate(validation.dialogValidation)], (req, res) => {
  logBookItemsSchema
    .create({
      userId: req.user._id,
      time: new Date(req.body.time),
      glucose: req.body.glucose,
      meal: req.body.meal,
      fastActingInsulinUnits: req.body.fastActingInsulinUnits,
      carbs: req.body.carbs,
      protein: req.body.protein,
      fat: req.body.fat,
    })
    .then((log) => res.json(log))
    .catch((err) => res.json({ err }));
});

app.get("/logbook", isLoggedIn, async (req, res) => {
  let lastLogId,
    hasNext,
    limit = 3;

  //get logbooks that are less than query cursor
  const logBooks = await logBookItemsSchema
    .find({ _id: { $lt: req.query.previousCursor } })
    .sort({ _id: -1 })
    .limit(limit);

  if (logBooks.length) {
    firstLogId = logBooks[0];
    lastLogId = logBooks[logBooks.length - 1]._id;
    //checking if the last log is the last in the DB
    hasNext = !!(await logBookItemsSchema.findOne({ _id: { $lt: lastLogId } }));
  }
  res.json({ logBooks, previous_cursor: req.query.previousCursor, next_cursor: lastLogId, hasNext });
});

app.get("/settings", (req, res) => {
  res.json({ msg: "settings" });
});

app.post("/settings", (req, res) => {
  const data = {
    bio: req.body.bio,
    age: req.body.age,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
    diabetesType: req.body.diabetesType,
    hb1ac: req.body.hb1ac,
    newUser: false,
    updatedAt: new Date(),
  };
  const userId = req.user._id;
  const UpdateSettings = userSchema.insertMany();
});

app.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
