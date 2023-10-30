const express = require("express");
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const moment = require("moment");
const mealSchema = require("../models/mealSchema");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    //time provided by user or default date (today)
    let today = req.query.date == undefined || !req.query.date ? moment().format("L") : moment(req.query.date, "MM/DD/YYYY").format("L");
    // console.log(today);
    const todayMax = moment(today, "MM/DD/YYYY").endOf("day");
    const todayMin = moment(today, "MM/DD/YYYY").startOf("day");

    //get the logs of specific day
    const logs = await logBookItemsSchema
      .find({
        userId: req.user._id,
        time: { $gte: todayMin.toString(), $lt: todayMax.toString() },
      })
      // descending sorting
      .sort({ time: -1 });

    res.status(200).json({
      logBooks: logs
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
