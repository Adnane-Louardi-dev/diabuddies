const express = require("express");
const router = express.Router();
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { validate } = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");

router.get("/", async (req, res) => {
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

router.post("/", validate(validation.dialogValidation), (req, res) => {
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
router.delete("/", async (req, res) => {
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
