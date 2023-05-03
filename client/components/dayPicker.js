import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateDate } from "../features/dayPicker/dayPicker";
import { Icon } from "@iconify/react";
import moment from "moment";

const DayPicker = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [UserDate, setUserDate] = useState(moment().format("L"));
  const datePickerInputFormat = "dddd, DD MMMM yyyy";

  return (
    <>
      <div>
        <div className="flex items-center mt-5 py-3 rounded-full shadow-md bg-white w-full">
          <DatePicker
            renderInput={(props) => (
              <>
                <div>
                  <div className="bg-diaLightBlue  rounded-full p-4 mx-3">
                    <Icon icon="material-symbols:calendar-month" className="text-white h-5 w-5" />
                  </div>
                </div>
                <TextField
                  sx={{
                    "& fieldset": { top: 15, border: "none" },
                    "& .MuiInputBase-root": {
                      fontFamily: "poppins",
                      border: "0px",
                      marginRight: 3,
                      paddingY: 1.5,
                      height: 55,
                      alignItems: "end",
                      flexWrap: "wrap",
                    },
                    "& .MuiInputBase-root:hover": {
                      backgroundColor: "#e5e7eb",
                    },
                    "& .MuiInputBase-root input": { height: 20 },
                  }}
                  {...props}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <div>
                          <div className="flex items-center">
                            <p>Date</p>
                            <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
                          </div>
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            value={router.query.date || UserDate}
            inputFormat={datePickerInputFormat}
            onAccept={(newDateValue) => dispatch(updateDate(newDateValue._d))}
            onChange={(newDateValue) => setUserDate(newDateValue)}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default DayPicker;
