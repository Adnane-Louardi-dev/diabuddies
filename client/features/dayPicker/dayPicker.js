import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const dayPicker = createSlice({
  name: "pickADay",
  initialState: {
    value: undefined,
  },
  reducers: {
    updateDate: (state, action) => {
      state.value = moment(action.payload, "MM/DD/YYYY").format("MM/DD/YYYY");
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDate } = dayPicker.actions;

export default dayPicker.reducer;
