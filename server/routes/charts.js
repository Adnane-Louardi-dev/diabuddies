const express = require("express");
const router = express.Router();
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const moment = require("moment");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");

router.get("/", isLoggedIn, async (req, res) => {
  const fromDate = moment(req.query.from, "DD/MM/YYYY").isValid() ? moment(req.query.from, "DD/MM/YYYY").format() : req.query.from;
  const toDate = moment(req.query.to, "DD/MM/YYYY").isValid() ? moment(req.query.to, "DD/MM/YYYY").add(1, "day").format() : req.query.to;
  console.log(fromDate, toDate);
  //get the logs of specific day
  const logs = await logBookItemsSchema
    .find({
      userId: req.user,
      time: {
        $gte: fromDate,
        $lte: toDate,
      },
    })
    .sort({ time: 1 });

  const sumOfGlucoseVal = logs.reduce((accumulator, curOBJ) => {
    return accumulator + curOBJ.glucose;
  }, 0);

  res.status(200).json({
      avgEgvs: sumOfGlucoseVal / logs.length,
      logs,
    },
  );
});
module.exports = router;
