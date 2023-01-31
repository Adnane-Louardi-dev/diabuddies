const express = require("express");
const router = express.Router();
const logBookItemsSchema = require("../models/logBookItemsSchema");
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
module.exports = router;
