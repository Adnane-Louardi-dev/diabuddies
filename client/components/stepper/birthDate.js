import {MobileDatePicker} from "@mui/x-date-pickers";
import {InputAdornment, TextField} from "@mui/material";
import {Icon} from "@iconify/react";

const BirthDate = ({data, setData}) => {
    const handleBirthDateChange = (newBirthDateValue) => {
        console.log("date", newBirthDateValue._d)
        setData(oldData => ({...oldData, birthDate: newBirthDateValue._d}))
    };
    return (
        <section>
            <div className="mt-24 grid items-center justify-center text-center">
                <h1 className="font-semibold font-poppins text-xl">
                    Your <span className="decoration-none font-bold text-diaBlue">date of birth</span>
                </h1>
        <p className="my-3 font-rubik text-gray-400">
          we will use this data for a better <br />
          management for you
        </p>
      </div>
      <div className="grid grid-cols-1 py-5 my-19">
        <MobileDatePicker
          className="m-5"
          renderInput={(props) => (
            <TextField
              {...props}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon icon="material-symbols:calendar-view-day-rounded" className="h-7 w-7 text-diaLightBlue" />
                  </InputAdornment>
                ),
              }}
              sx={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  "& fieldset": {borderRadius: 7, boxShadow: "0px 0px 20px -10px"},
                  "& .MuiInputBase-input": {
                      textAlign: "center",
                      fontFamily: "poppins",
                  },
              }}
            />
          )}
          value={data.birthDate}
          onChange={handleBirthDateChange}
          views={["year", "month", "day"]}
          inputFormat={"dddd, DD MMMM yyyy"}
        />
      </div>
    </section>
  );
};

export default BirthDate;
