import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import moment from "moment/moment";

export default function DateToggleBtn({ setDate }) {
  const [alignment, setAlignment] = React.useState(0);

  const handleChange = (event, newAlignment) => {
    if (newAlignment != null) {
      setAlignment(newAlignment);
      setDate(moment(new Date()).subtract(newAlignment, "day").format("DD/MM/YYYY"));
    }
  };

  return (
    <ToggleButtonGroup
      sx={{
        "& .MuiToggleButtonGroup-root , .MuiButtonBase-root": {
          border: "none",
          marginX: 1,
        },
        "& .MuiToggleButtonGroup-grouped:not(:last-of-type),.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
          borderRadius: "15px 15px 15px 15px",
        },
      }}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={30}>Month</ToggleButton>
      <ToggleButton value={7}>Week</ToggleButton>
      <ToggleButton value={0}>Today</ToggleButton>
    </ToggleButtonGroup>
  );
}
