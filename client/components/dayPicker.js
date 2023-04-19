import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import moment from "moment";
import Button from "@mui/material/Button";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const DayPicker = () => {
  const [dateValue, setDateValue] = useState(moment());

  return (
    <>
      <div>
        <div className="flex justify-between my-3 p-3 rounded-full shadow-md bg-white w-full">
          <DatePicker
            renderInput={(props) => (
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "25px",
                    width: "full",
                  },
                }}
                {...props}
              />
            )}
            value={dateValue}
            onChange={(newDateValue) => setDateValue(newDateValue)}
          />
          <Button variant="contained" className="rounded-full shadow-none bg-diaGreen">
            Get now
          </Button>
        </div>
      </div>
    </>
  );
};

export default DayPicker;
