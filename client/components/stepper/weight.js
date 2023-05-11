import React from "react";
import { useState } from "react";
import { TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addWeightUnit, addWeightValue } from "../../features/stepper/stepper";

const Weight = () => {
  const dispatch = useDispatch();
  const [weightUnit, setWeightValue] = useState("kg");

  const handleWeightUnitChange = (event, newWeightUnit) => {
    setWeightValue(newWeightUnit);
    dispatch(addWeightUnit(newWeightUnit));
  };
  const handleWeightValueChange = (event) => {
    dispatch(addWeightValue(event.target.value));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        <h1 className="font-semibold font-poppins text-xl">
          What about your <span className="decoration-none font-bold text-diaBlue">Weight</span> ?
        </h1>
      </div>
      <div className="grid items-center justify-center text-center mx-16 my-16 py-8">
        <ToggleButtonGroup
          className="grid grid-cols-2 gap-5 mx-5 py-5"
          sx={{
            "& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected": {
              backgroundColor: "#FFD7AA",
              border: "none",
              color: "white",
            },
          }}
          value={weightUnit}
          exclusive
          onChange={handleWeightUnitChange}
        >
          <ToggleButton value="lbs" className="rounded-full font-semibold">
            lbs
          </ToggleButton>
          <ToggleButton value="kg" className="rounded-full font-semibold">
            kg
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 items-center justify-center p-2 bg-diaBlue rounded-3xl shadow-md">
          <TextField
            onChange={handleWeightValueChange}
            id="outlined-number"
            variant="standard"
            placeholder="0"
            sx={{
              marginTop: 1,
              marginX: 1,
              border: "none",
              width: "full",
              "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
                display: "none",
              },
              "& .MuiInputBase-input": {
                color: "white",
                textAlign: "center",
                fontSize: 50,
                fontStyle: "bold",
                width: "full",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Weight;
