const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const profileRoute = require("./routes/profile");
const signup = require("./routes/signup");
const auth = require("./routes/auth");

const app = express();

//DB connect
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgq8q.mongodb.net/?retryWrites=true&w=majority&ssl=true`, () =>
  console.log("DB connected!")
);

//middleswares
app.use(express.json());
app.use(cors());
app.use("/profile", profileRoute);
app.use("/signup", signup);
app.use("/login", auth);

//
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
