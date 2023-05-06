const express = require("express");
const logBookItemsSchema = require("../models/logBookItemsSchema");
const {validate} = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const router = express.Router();


const isLoggedIn = (req, res, next) => {
    // req.user ? next() : res.redirect("/login");
    req.user ? next() : res.sendStatus(401);
};
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




module.exports = router