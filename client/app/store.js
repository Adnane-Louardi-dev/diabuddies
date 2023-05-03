import { configureStore } from "@reduxjs/toolkit";
import dayPicker from "../features/dayPicker/dayPicker";
export default configureStore({
  reducer: { dayPicker: dayPicker },
});
