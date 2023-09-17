require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const morgan = require("morgan");
const {login,logbook, userRoutes, user, charts, wishList, order, comments, store, blog, aiAssistant, gamifyRouter} = require("./routes")
const {schedule} = require("node-cron");
const {gamificationSchema} = require("./models/gamificationSchema");
const {isLoggedIn} = require("./middlewares/isLoggedIn");
const {newActionLog} = require("./controllers/gamifyControllers");
const {levelsSchema} = require("./models/levelsSchema");
const initialize = require("./util/DBconnect");
//DB connect
const DBConnection =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgq8q.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
mongoose.connect(DBConnection, async () => {
    await createLevels()
    schedule('0 0 0 * * *', ()=>{
        gamificationSchema.updateMany({},{
            dailyLogInClaimed: false
        })
    });
    console.log("DB connected!")
});

initialize().then(()=>{
    console.log("db connected successfully")
})

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

app.post("/daily_log_in",isLoggedIn,async (req,res)=>{
    const gamify = await gamificationSchema.findOne({
            user: req.user._id
        })
    if(gamify.dailyLogInClaimed){
        return res.status(200).json({message: "already claimed"})
    }
    gamify.dailyLogInClaimed = true
    await gamify.save()
    await newActionLog("dailyLogIn",req.user._id)
    return res.status(201).json({message: "claimed"})
})

const createLevels = async () => {
    const existedLevelsCount = await levelsSchema.countDocuments({})
    if(!existedLevelsCount){
        const thirdLevel = await levelsSchema.create({
            levelName: "Third level",
            level:3,
            minPoints: 100,
            maxPoints: 300
        })
        const secondLevel = await levelsSchema.create({
            levelName: "Second level",
            level:2,
            minPoints: 100,
            maxPoints: 300,
            nextLevel: thirdLevel._id
        })
        const firstLevel = await levelsSchema.create({
            levelName: "First level",
            level:1,
            minPoints: 0,
            maxPoints: 100,
            nextLevel: secondLevel._id
        })
        await Promise.all([firstLevel.save(), secondLevel.save(),thirdLevel.save()])
    }
}