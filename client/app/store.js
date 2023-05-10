import { configureStore } from "@reduxjs/toolkit";
import dayPicker from "../features/dayPicker/dayPicker";
import stepper from "../features/stepper/stepper";

export default configureStore({
  reducer: {
    dayPicker,
    stepper,
  },
});
