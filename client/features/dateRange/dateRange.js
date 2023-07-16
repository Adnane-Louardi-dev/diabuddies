import {createSlice} from "@reduxjs/toolkit";

//date range state management for dateToggle component in /charts route
export const dateRange = createSlice({
  name: "dateRange",
  initialState: {
      value: {toggleBtnSelectedValue: 7,},
  },
  reducers: {
    updateDateRange: (state, action) => {
      state.value.toggleBtnSelectedValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDateRange } = dateRange.actions;

export default dateRange.reducer;
