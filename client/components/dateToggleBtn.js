import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { updateDateRange } from "../features/dateRange/dateRange";
export default function DateToggleBtn() {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = React.useState(useSelector((state) => state.dateRange.value.toggleBtnSelectedValue));

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      dispatch(updateDateRange(newAlignment));
      setAlignment(newAlignment);
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
