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
const logBookItemsSchema = require("./models/logBookItemsSchema");
const settings = require("./routes/settings");
const logbook = require("./routes/logbook");

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
const isLoggedIn = (req, res, next) => {
  // req.user ? next() : res.redirect("/login");
  req.user ? next() : res.sendStatus(401);
};
app.use(passport.session());
app.use(passport.initialize());
// app.use(isLoggedIn);
app.use("/login", login);
app.use("/logbook", logbook);
app.use("/settings", settings);
//ensure that user is log in

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

  //get the logs of specific day
  const logs = await logBookItemsSchema
    .find({
      userId: req.user._id,
      time: { $gte: todayMin.toString(), $lt: todayMax.toString() },
    })
    // descending sorting
    .sort({ time: -1 });

  let egvs = logs.map((log) => {
    return {
      time: log.time.substring(16),
      egv: log.glucose,
      status: log.glucose <= 70 ? "Low" : log.glucose >= 180 ? "High" : "Normal",
      unit: "ml/dL",
    };
  });

  const someGlucoseVal = egvs.reduce((accumulator, curOBJ) => {
    return accumulator + curOBJ.egv;
  }, 0);

  res.status(200).json({
    user: req.user,
    logBook: logs,
    graphData: {
      avgEgvs: someGlucoseVal / egvs.length,
      egvs,
    },
  });
});

app.post("/", validate(validation.dialogValidation), (req, res) => {
  console.log(req.body);
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

// DELETE a log by ID
app.delete("/", async (req, res) => {
  try {
    const log = await logBookItemsSchema.findByIdAndDelete(req.query.id);
    console.log(req.query.id);
    if (!log) {
      return res.status(404).send({ error: "Log not found" });
    }
    res.send(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
