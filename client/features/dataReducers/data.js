import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
//build new array of estimated glucose values
let GETegvs = (arr) => {
  let mappedEgvs = arr.map((log) => {
    return {
      time: log.time.substring(16),
      egv: log.glucose,
      status: log.glucose <= 70 ? "low" : log.glucose >= 180 ? (log.glucose >= 250 ? "veryHigh" : "high") : "normal",
      unit: "ml/dL",
    };
  });
  return mappedEgvs;
};
export const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    value: { user: {}, logBook: [], graphData: { avgEgvs: null, egvs: [] } },
  },
  reducers: {
    //store data getted from API
    storeData: (state, action) => {
      state.value = action.payload;
    },
    //add new log reducer
    appendNewLog: (state, action) => {
      let { logBook } = state.value;
      let logBookWithNewLog = [...logBook, action.payload];
      //sort the new log by date
      let sortedLogBook = logBookWithNewLog.slice().sort((a, b) => moment(b.time) - moment(a.time));
      state.value.logBook = sortedLogBook;
      //set new graphData
      let egvs = GETegvs(sortedLogBook);
      state.value.graphData.egvs = egvs;
    },
    //delete a log
    deleteLog: (state, action) => {
      let { logBook } = state.value;
      let filtredLogs = logBook.filter((log, i) => {
        return log._id !== action.payload._id;
      });
      state.value.logBook = filtredLogs;
      //update egvs
      let egvs = GETegvs(filtredLogs);
      state.value.graphData.egvs = egvs;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeData, appendNewLog, deleteLog } = dataSlice.actions;

export default dataSlice.reducer;
