const express = require("express");
const router = express.Router();
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const moment = require("moment");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
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

router.post("/", [isLoggedIn, validate(validation.dialogValidation)], (req, res) => {
  logBookItemsSchema
    .create({
      userId: req.user._id,
      time: moment(req.body.time),
      glucose: req.body.glucose,
      unit: req.user.unit,
      status: req.body.glucose <= 69 ? "low" : req.body.glucose >= 181 ? (req.body.glucose >= 251 ? "veryHigh" : "high") : "normal",
      meal: req.body.meal,
      bolus: req.body.bolus,
      basal: req.body.basal,
      carbs: req.body.carbs,
      protein: req.body.protein,
      fat: req.body.fat,
      kcal: req.body.kcal,
    })
    .then((log) => res.json(log))
    .catch((err) => res.json(err));
});
// DELETE a log by ID
router.delete("/", isLoggedIn, async (req, res) => {
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
module.exports = router;
