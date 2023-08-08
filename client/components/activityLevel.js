import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ActivityLevel() {
  const [alignment, setAlignment] = useState("low");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      className="w-full justify-center shadow-md"
      sx={{
        "& .MuiButtonBase-root-MuiToggleButton-root": {
          backgroundColor: "#FFD7AA",
        },
        "& .MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover": {
          color: "#FFB562",
        },
        "& .MuiButtonBase-root[aria-pressed='true']": {
          backgroundColor: "#FFD7AA",
          color: "white",
        },
      }}
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="low" className="grid gap-2 rounded-full w-full rounded-md normal-case font-rubik text-lg">
        Low
        <span className="font-sourceCode text-diaGray text-2xs">no reduce</span>
      </ToggleButton>
      <ToggleButton value="moderate" className="grid gap-2 rounded-full w-full rounded-md normal-case font-rubik text-lg">
        Moderate
        <span className="font-sourceCode text-diaGray text-2xs">reduce by 15%</span>
      </ToggleButton>
      <ToggleButton value="high" className="grid gap-2 rounded-full w-full rounded-md normal-case font-rubik text-lg">
        High
        <span className="font-sourceCode text-diaGray text-2xs">reduce by 30%</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
