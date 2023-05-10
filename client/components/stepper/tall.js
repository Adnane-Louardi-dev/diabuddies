import { useState } from "react";
import { TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addHeightValue, addHeightUnit } from "../../features/stepper/stepper";

const Tall = ({ props }) => {
  const dispatch = useDispatch();
  const [heightUnit, setHeightValue] = useState("cm");

  const handleHeightUnitChange = (event, newHeightUnit) => {
    setHeightValue(newHeightUnit);
    dispatch(addHeightUnit(newHeightUnit));
  };
  const handleHeightValueChange = (event) => {
    dispatch(addHeightValue(event.target.value));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        <h1 className="font-semibold font-poppins text-xl">
          How <span className="decoration-none font-bold text-diaBlue">tall</span> are you?
        </h1>
      </div>
      <div className="grid items-center justify-center text-center mx-16 my-16 py-8">
        <ToggleButtonGroup
          className="grid grid-cols-2 gap-5 mx-5 py-5"
          sx={{
            "& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected": {
              backgroundColor: "#666666",
              color: "white",
            },
          }}
          value={heightUnit}
          exclusive
          onChange={handleHeightUnitChange}
        >
          <ToggleButton value="ft" className="rounded-full font-semibold">
            ft
          </ToggleButton>
          <ToggleButton value="cm" className="rounded-full font-semibold">
            cm
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 items-center justify-center p-2 bg-diaBlue rounded-3xl shadow-md">
          <TextField
            onChange={handleHeightValueChange}
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

export default Tall;
