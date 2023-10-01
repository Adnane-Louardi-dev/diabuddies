const mongoose = require("mongoose");
const { gamificationSchema } = require("./gamificationSchema");

const actionLogSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId, // Reference to the user who performed the action
    actionType: {
      type: String,
      enum: ["dailyLogIn", "addedNewLogBook", "readABlog", "makeOrder", "postAComment", "setupProfile", "submitSurvey", "share"],
    }, // E.g., "completedTask", "postedComment"
    pointsEarned: {
      type: Number,
      default: 0,
    },
    gamification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gamificationSchema",
    },
  },
  { timestamps: true }
);

actionLogSchema.post("validate", async function (_, next) {
  const actionLog = this;
  const actionLogs = {
    dailyLogIn: 5,
    addedNewLogBook: 1,
    readABlog: 2,
    makeOrder: 15,
    postAComment: 1,
    share: 5,
    setupProfile: 10,
    submitSurvey: 15,
  };
  actionLog.pointsEarned = actionLogs[actionLog.actionType] ?? 0;
  const newGamify = await gamificationSchema
    .findOneAndUpdate(
      {
        user: actionLog.userId,
      },
      {
        $inc: {
          points: actionLogs[actionLog.actionType] ?? 0,
        },
      },
      { new: true }
    )
    .populate("level");
  // console.log("points: ",newGamify.points, " level ",newGamify.level.maxPoints, "next level", newGamify.level.nextLevel)
  if (newGamify && newGamify.points >= newGamify.level.maxPoints) {
    await gamificationSchema.findByIdAndUpdate(newGamify._id, {
      level: newGamify.level.nextLevel,
    });
  }
  next();
});
module.exports = {
  actionLogSchema: mongoose.model("actionLogSchema", actionLogSchema),
};
