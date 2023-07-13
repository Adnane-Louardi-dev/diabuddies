const express = require("express");
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  //time provided by user or default date (today)
  let today = req.query.date == undefined || !req.query.date ? new Date() : new Date(req.query.date);
  console.log(today);
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

  const someGlucoseVal = logs.reduce((accumulator, curOBJ) => {
    return accumulator + curOBJ.glucose;
  }, 0);

  res.status(200).json({
    user: req.user,
    logBook: logs,
    graphData: {
      avgEgvs: someGlucoseVal / logs.length,
      egvs: logs,
    },
  });
});

module.exports = router;
