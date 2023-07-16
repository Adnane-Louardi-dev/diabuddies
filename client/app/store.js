import { configureStore } from "@reduxjs/toolkit";
import dayPicker from "../features/dayPicker/dayPicker";
import stepper from "../features/stepper/stepper";
import dataSlice from "../features/dataReducers/data";
import dateRange from "../features/dateRange/dateRange";

export default configureStore({
  reducer: {
    dayPicker,
    stepper,
    dataSlice,
    dateRange,
  },
});
