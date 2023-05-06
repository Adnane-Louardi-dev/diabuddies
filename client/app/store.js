import {configureStore} from "@reduxjs/toolkit";
import dayPicker from "../features/dayPicker/dayPicker";
import {user} from "../features/user/user";

export default configureStore({
  reducer: {
    dayPicker: dayPicker,
    user: user
  },
});
