import { useState } from "react";
import { TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Icon } from "@iconify/react";

const Tall = () => {
  const [heightValue, setHeightValue] = useState();
  const [alignment, setAlignment] = useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        <h1 className="font-semibold font-poppins text-xl">
          How <span className="decoration-none font-bold text-diaBlue">tall</span> are you?
        </h1>
      </div>
      <div className="grid items-center justify-center text-center mx-16 my-16 p-8">
        <ToggleButtonGroup className="grid grid-cols-2 gap-4 m-5" color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
          <ToggleButton value="ft" className="rounded-full bg-gray-800 text-white">
            ft
          </ToggleButton>
          <ToggleButton value="cm">cm</ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 h-52 items-center justify-center p-2.5 bg-diaLightBlue rounded-3xl shadow-md">
          <TextField
            id="outlined-number"
            type="tel"
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
                color: "#666666",
                textAlign: "center",
                fontSize: 50,
                fontStyle: "bold",
                width: "full",
              },
            }}
            onChange={(event) => {
              setHeightValue(event.target.value);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Tall;
