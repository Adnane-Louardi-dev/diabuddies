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
const logbook = require("./routes/logbook");
const userRoutes = require("./routes/userRoutes");
const user = require("./routes/user");
const charts = require("./routes/charts");
const wishList = require("./routes/wishList");
const order = require("./routes/order");
const articles = require("./routes/articles");
const comments = require("./routes/comments");
//DB connect
const DBConnection = process.env.DB_CONNECTION || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgq8q.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
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
app.use("/", userRoutes);
app.use("/login", login);
app.use("/logbook", logbook);
app.use("/user", user);
app.use("/charts", charts);
app.use("/wishList", wishList);
app.use("/orders", order);
app.use("/articles", articles);
app.use("/comments", comments);

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
