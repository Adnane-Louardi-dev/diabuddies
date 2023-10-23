const logBookItemsSchema = require("../models/logBookItemsSchema");
const moment = require("moment/moment");
const { newActionLog } = require("./gamifyControllers");

const getLogBook = async (req, res) => {
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
  return res.json({ logBooks, previous_cursor: req.query.previousCursor, next_cursor: lastLogId, hasNext });
};

const addEditLog = (req, res) => {
    const payload = {
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
        food: req.body.food,
    }
    if(req.body._id){
        logBookItemsSchema.findByIdAndUpdate(req.body._id, payload)
            .then((log) => res.json(log))
            .catch((err) => res.json(err));
    } else {
        logBookItemsSchema
            .create(payload)
            .then((log) => res.json(log))
            .catch((err) => res.json(err));
        newActionLog("addedNewLogBook", req.user._id);
    }
};

const deleteLog = async (req, res) => {
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
};

module.exports = { getLogBook, addNewLog: addEditLog, deleteLog };
