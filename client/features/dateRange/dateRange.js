import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

//date range state management for dateToggle component in /charts route
export const dateRange = createSlice({
  name: "dateRange",
  initialState: {
    value: { toggleBtnSelectedValue: 7, dateRange: moment(new Date()).format("DD/MM/YYYY") },
  },
  reducers: {
    updateDateRange: (state, action) => {
      state.value.dateRange = moment(new Date()).subtract(action.payload, "day").format("DD/MM/YYYY");
      state.value.toggleBtnSelectedValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDateRange } = dateRange.actions;

export default dateRange.reducer;
