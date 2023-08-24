const userSchema = require("../models/userSchema");
const {diabetecDetailsSchema} = require("../models/diabetecDetailsSchema");
const {newActionLog} = require("./gamifyControllers");

module.exports = {
    updateUser: async (req, res) => {
        try {
            const changedData = req.body;
            userSchema
                .updateOne({ _id: req.user._id }, { $set: changedData })
                .then(async () => {
                    const user = await userSchema.findById(req.user._id);
                    return res.json({ user });
                })
                .catch((err) => res.json(err));
        } catch (e) {
            console.error(e);
            return res.json({ msg: e });
        }
    },
    getMe: async (req, res) => {
        try {
            const user = await userSchema.findById(req.user._id);
            return res.status(201).json(user);
        } catch (e) {
            return res.status(404).json({ msg: e });
        }
    },
    getMeDetailed: async (req,res) => {
      const detailedUser = await userSchema
          .findById(req.user._id)
      const diabetecDetails = await diabetecDetailsSchema.findOne({
          userId: req.user._id
      })
      detailedUser.diabetecDetails = diabetecDetails
      return res.status(200).json(detailedUser)
    },
    addMedicament: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await userSchema.findById(userId);
            user.medications = [...user.medications, req.body];
            await user.save();
            return res.status(201).json(user.medications);
        } catch (e) {
            console.error(e);
            return res.json({ msg: e });
        }
    },
    updateDiabetecDetails: async (req,res) => {
        const {
            birthDate,
            gender,
            height,
            weight,
            diabetesType,
            carbsRatio,
            bodyFatPercentage,
            insulinSensitivity,
            hb1ac,
            hyperglycemia,
            normalBloodGlucose,
            hypoglycemia,
            unit
        } = req.body
        const payload = JSON.parse(JSON.stringify({
            birthDate,
            gender,
            height,
            weight,
            diabetesType,
            carbsRatio,
            bodyFatPercentage,
            insulinSensitivity,
            hb1ac,
            hyperglycemia,
            normalBloodGlucose,
            hypoglycemia,
            unit
        }))
        const updatedDiabetecDetails = await diabetecDetailsSchema.updateOne({
            userId: req.user._id,
        },payload,{new: true})
        return res.status(201).json(updatedDiabetecDetails)
    },
    setupProfile: async (req,res) => {
        const {
            birthDate,
            gender,
            height,
            weight,
            insulinSensitivity,
            hb1ac
        } = req.body
        const payload = JSON.parse(JSON.stringify({
            userId: req.user._id,
            birthDate,
            gender,
            height,
            weight,
            insulinSensitivity,
            hb1ac
        }))
        const diabetecDetails = await diabetecDetailsSchema.create(payload)
        await userSchema.findByIdAndUpdate(req.user._id, {newUser: false})
        newActionLog("setupProfile",req.user._id)
        return res.status(201).json(diabetecDetails)
    }
}