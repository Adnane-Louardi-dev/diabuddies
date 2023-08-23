const {gamificationSchema} = require("../models/gamificationSchema");
const {actionLogSchema} = require("../models/actionLogSchema");
const {levelsSchema} = require("../models/levelsSchema");


module.exports = {
    getUserGamification: async (req,res) => {
        const gamification = await gamificationSchema.findOne({
            userId: req.user._id
        }).populate("level")
        return res.status(200).json(gamification)
    },
    createGamification: async (req,res) => {
        const exsitedGamification = await gamificationSchema.findOne({
            userId: req.user._id
        })
        if(exsitedGamification){
            return res.status(404).json({message: "already existed gamification"})
        }
        const secondLevel = await levelsSchema.create({
            levelName: "second level",
            minPoints: 100,
            maxPoints: 300
        })
        const firstLevel = await levelsSchema.create({
            levelName: "first level",
            minPoints: 0,
            maxPoints: 100,
            nextLevel: secondLevel._id
        })
        await Promise.all([firstLevel.save(), secondLevel.save()])
        const gamification = await gamificationSchema.create({
            userId: req.user._id,
            level: firstLevel._id
        })
        await gamification.save()
        return res.status(200).json(gamification.populate("level"))
    },
    newActionLog: async (actionType,userId) => {
        await actionLogSchema.create({
            userId: userId,
            actionType: actionType,
        })
    },
    getUserActions: async (req,res) => {
        const actions = await actionLogSchema.find({
            userId: req.user._id
        }).sort({ _id: -1 })
        return res.status(200).json(actions)
    }
}