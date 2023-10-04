const userSchema = require("../models/userSchema");
const logBookItemsSchema = require("../models/logBookItemsSchema");
const { diabeticDetailsSchema } = require("../models/diabeticDetailsSchema");
const { newActionLog } = require("./gamifyControllers");
const { orderQuery } = require("../util/baseQueries");
const { medicamentModel } = require("../models/medicamentSchema");

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
      console.log("changed user", changedData);
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
  getMeDetailed: async (req, res) => {
    const detailedUser = await userSchema.findById(req.user._id);
    const diabeticDetails = await diabeticDetailsSchema
      .findOne({
        userId: req.user._id,
      })
      .populate({
        path: "medications",
        populate: {
          path: "brand",
        },
      });
    return res.status(200).json({ detailedUser, diabeticDetails });
  },
  getProfile: async (req, res) => {
    try {
      const user = await userSchema.findOne({ profileId: { token: req.params.token } });
      if (user) {
        const diabeticDetails = await diabeticDetailsSchema.findOne({
          userId: user._id,
        });
        const recentLogBooks = await logBookItemsSchema.find({ userId: user._id }).sort({ time: -1 }).limit(5);

        return res.status(201).json({
          givenName: user.givenName,
          familyName: user.familyName,
          photo: user.photo,
          diabeticDetails,
          recentLogBooks,
        });
      }
      return res.status(404).json({ msg: "didn't find a user with this token. verify it pleaser." });
    } catch (e) {
      return res.status(404).json({ msg: "some error occurred, try again later." });
    }
  },
  getMedicaments: async (req, res) => {
    const medicaments = await medicamentModel.find({});
    return res.status(200).json(medicaments);
  },
  addMedicament: async (req, res) => {
    try {
      const { brand, color, actingTime } = req.body;
      const user = await diabeticDetailsSchema.findOne({ userId: req.user._id });
      user.medications = [...user.medications, { brand, color, actingTime }];
      await user.save();
      return res.status(201).json(user.medications);
    } catch (e) {
      console.error(e);
      return res.json({ msg: e });
    }
  },
  editMedicament: async (req, res) => {
    try {
      const { brand, color, actingTime, id } = req.body;
      const user = await diabeticDetailsSchema.findOne({ userId: req.user._id });
      const medication = user.medications.find((medication) => medication._id.equals(id));
      if (medication) {
        medication.brand = brand;
        medication.color = color;
        medication.actingTime = actingTime;
        await user.save();
        return res.status(201).json(user.medications);
      }
      throw new Error("this medication doesn't exist");
    } catch (e) {
      console.error(e);
      return res.json({ msg: e });
    }
  },
  deleteMedicament: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await diabeticDetailsSchema.findOne({ userId: req.user._id });
      console.log("to delete", id);
      user.medications = user.medications.filter((medication) => !medication._id.equals(id));
      await user.save();
      return res.status(201).json(user.medications);
    } catch (e) {
      console.error(e);
      return res.json({ msg: e });
    }
  },
  updatediabeticDetails: async (req, res) => {
    const { birthDate, gender, height, weight, diabetesType, carbsRatio, bodyFatPercentage, insulinSensitivity, hb1ac, hyperglycemia, normalBloodGlucose, hypoglycemia, unit, dailyCaloriesNeeds } = req.body;
    const payload = JSON.parse(
      JSON.stringify({
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
        unit,
        dailyCaloriesNeeds,
      })
    );
    const updateddiabeticDetails = await diabeticDetailsSchema.updateOne(
      {
        userId: req.user._id,
      },
      payload,
      { new: true }
    );
    return res.status(201).json(updateddiabeticDetails);
  },
  setupProfile: async (req, res) => {
    const { birthDate, gender, height, weight, insulinSensitivity, hb1ac } = req.body;
    const payload = JSON.parse(
      JSON.stringify({
        userId: req.user._id,
        birthDate,
        gender,
        height,
        weight,
        insulinSensitivity,
        hb1ac,
      })
    );
    const diabeticDetails = await diabeticDetailsSchema.create(payload);
    await userSchema.findByIdAndUpdate(req.user._id, { newUser: false });
    newActionLog("setupProfile", req.user._id);
    return res.status(201).json(diabeticDetails);
  },
};
