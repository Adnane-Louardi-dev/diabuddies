require("dotenv").config({ path: `./.env.${process.env.NODE_ENV || "development"}` })
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const httpProxy = require('http-proxy')
const MongoStore = require("connect-mongo");
const passport = require("passport");
const morgan = require("morgan");
const { login, logbook, userRoutes, user, charts, wishList, order, comments, store, blog, aiAssistant, gamifyRouter } = require("./routes");
const { schedule } = require("node-cron");
const { gamificationSchema } = require("./models/gamificationSchema");
const { isLoggedIn } = require("./middlewares/isLoggedIn");
const { newActionLog } = require("./controllers/gamifyControllers");
const { levelsSchema } = require("./models/levelsSchema");
const initialize = require("./util/DBconnect");
const {createLevels, initMedicament} = require("./util/initDB");
const axios = require("axios");
//DB connect
const DBConnection = process.env.DB_CONNECTION || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgq8q.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
mongoose.set("strictQuery", false);
mongoose.connect(DBConnection, async () => {
  await createLevels();
  await initMedicament();
  schedule("0 0 0 * * *", () => {
    gamificationSchema.updateMany(
      {},
      {
        dailyLogInClaimed: false,
      }
    );
  });
  console.log("DB connected!");
});

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
let proxy = httpProxy.createProxyServer({
    host: 'http://localhost',
    port: process.env.PORT,
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('Authorization', `Bearer ${process.env.STRAPI}`);
});
app.use('/service-api', function(req, res, next) {
    proxy.web(req, res, {
        target: `${process.env.STRAPI_URL}/api`
    }, next);
    console.log("req",req)
});
app.get("/food-api/:foodQuery", async (req,res) =>{
    try {
        const {data} = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${req.params.foodQuery}`, {
            headers: {
                "X-Api-Key": process.env.FOOD_API
            }
        });
        console.log("data", data)
        return res.status(201).json(data)
    } catch (e) {
        console.log("error", e)
        return res.status(404).json(e.data)
    }
})
app.use("/", userRoutes);
app.use("/login", login);
app.use("/logbook", logbook);
app.use("/user", user);
app.use("/charts", charts);
app.use("/wishList", wishList);
app.use("/orders", order);
app.use("/blog", blog);
app.use("/comments", comments);
app.use("/aiAssistant", aiAssistant);
app.use("/store", store);
app.use("/gamify", gamifyRouter);

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

app.post("/daily_log_in", isLoggedIn, async (req, res) => {
  const gamify = await gamificationSchema.findOne({
    user: req.user._id,
  });
  if (gamify.dailyLogInClaimed) {
    return res.status(200).json({ message: "already claimed" });
  }
  gamify.dailyLogInClaimed = true;
  await gamify.save();
  await newActionLog("dailyLogIn", req.user._id);
  return res.status(201).json({ message: "claimed" });
});


const initalMedicament = async () => {

}