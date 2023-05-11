import React from "react";
import { useState } from "react";
import { TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addHb1acValue, addHb1acUnit } from "../../features/stepper/stepper";

const Hb1ac = () => {
  const dispatch = useDispatch();
  const [Hb1acUnit, setHb1acValue] = useState("IFCC");

  const handleHb1acUnitChange = (event, newHb1acUnit) => {
    setHb1acValue(newHb1acUnit);
    dispatch(addHb1acUnit(newHb1acUnit));
  };
  const handleHb1acValueChange = (event) => {
    dispatch(addHb1acValue(event.target.value));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        <h1 className="font-semibold font-poppins text-xl">
          What about your last <span className="decoration-none font-bold text-diaBlue">Hb1ac</span> ?
        </h1>
        <p className="my-3 font-rubik text-gray-400">
          <span className="font-semibold">Skip it</span> if you don't have an idea about it
          <br />
          don't worry, we gonna figure it out later
        </p>
      </div>
      <div className="grid items-center justify-center text-center mx-16 my-15 py-8">
        <ToggleButtonGroup
          className="grid grid-cols-2 gap-5 mx-2 py-5"
          sx={{
            "& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected": {
              backgroundColor: "#FFD7AA",
              border: "none",
              color: "white",
            },
          }}
          value={Hb1acUnit}
          exclusive
          onChange={handleHb1acUnitChange}
        >
          <ToggleButton value="DCCT" className="rounded-full font-semibold">
            DCCT
          </ToggleButton>
          <ToggleButton value="IFCC" className="rounded-full font-semibold">
            IFCC
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 items-center justify-center p-2 bg-diaBlue rounded-3xl shadow-md">
          <TextField
            onChange={handleHb1acValueChange}
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

export default Hb1ac;
