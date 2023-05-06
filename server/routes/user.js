const express = require("express");
const logBookItemsSchema = require("../models/logBookItemsSchema");
const {validate} = require("../middlewares/validationMiddleware");
const validation = require("../models/validationSchemas");
const router = express.Router();
const userSchema = require("../models/userSchema");



router.get("/me",async (req, res) => {
    try {
        const user = await userSchema.findById(req.user._id)
        return res.status(201).json(user)
    } catch (e) {
        return res.status(404).json({msg: e})
    }
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