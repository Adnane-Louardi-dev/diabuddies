const {gamificationSchema} = require("../models/gamificationSchema");
const {actionLogSchema} = require("../models/actionLogSchema");
const {levelsSchema} = require("../models/levelsSchema");


module.exports = {
    getUserGamification: async (req,res) => {
        const gamification = await gamificationSchema.findOne({
            user: req.user._id
        }).populate("level")
        return res.status(200).json(gamification)
    },
    createGamification: async (req,res) => {
        const exsitedGamification = await gamificationSchema.findOne({
            user: req.user._id
        })
        if(exsitedGamification){
            return res.status(404).json({message: "already existed gamification"})
        }
        const gamification = await gamificationSchema.create({
            user: req.user._id,
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
    },
    getLeaderboard: async (req,res) => {
        const leaderboard = await gamificationSchema
            .find({})
            .sort({
                points: -1
            })
            .limit(10)
            .populate(["user","level"])
        return res.status(200).json(leaderboard)
    }
}