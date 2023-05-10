import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const stepper = createSlice({
  name: "stepper",
  initialState: {
    value: {
      height: { value: 0, unit: "cm" },
      weight: { value: 0, unit: "kg" },
      birthDate: null,
      gender: "male",
      insulinSensitivity: { value: 0, unit: "mg/dL/1ui" },
      hb1ac: { value: 0, unit: "IFCC" },
    },
  },
  reducers: {
    addHeightValue: (state, action) => {
      const { payload } = action;
      state.value.height.value = payload;
    },
    addHeightUnit: (state, action) => {
      const { payload } = action;
      state.value.height.unit = payload;
    },
    addGender: (state, action) => {
      const { payload } = action;
      state.value.gender = payload;
    },
    addBirthDate: (state, action) => {
      const { payload } = action;
      state.value.birthDate = payload;
    },
    addWeightValue: (state, action) => {
      const { payload } = action;
      state.value.weight.value = payload;
    },
    addWeightUnit: (state, action) => {
      const { payload } = action;
      state.value.weight.unit = payload;
    },
    addInsulinSensitivityValue: (state, action) => {
      const { payload } = action;
      state.value.insulinSensitivity.value = payload;
    },
    addInsulinSensitivityUnit: (state, action) => {
      const { payload } = action;
      state.value.insulinSensitivity.unit = payload;
    },
    addHb1acValue: (state, action) => {
      const { payload } = action;
      state.value.hb1ac.value = payload;
    },
    addHb1acUnit: (state, action) => {
      const { payload } = action;
      state.value.hb1ac.unit = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addHeightValue,
  addHeightUnit,
  addGender,
  addBirthDate,
  addWeightValue,
  addWeightUnit,
  addInsulinSensitivityUnit,
  addInsulinSensitivityValue,
  addHb1acValue,
  addHb1acUnit,
} = stepper.actions;

export default stepper.reducer;
