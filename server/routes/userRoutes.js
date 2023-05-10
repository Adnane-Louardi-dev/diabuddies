const express = require("express");
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
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
      status: log.glucose <= 70 ? "low" : log.glucose >= 180 ? (log.glucose >= 250 ? "veryHigh" : "high") : "normal",
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

module.exports = router;
