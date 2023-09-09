import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {useTranslation} from "next-i18next";

export default function ReduceFactors({ setreduceLevel, reduceLevel }) {
  const [alignment, setAlignment] = useState(0);
  const {t} = useTranslation("index")
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setreduceLevel(alignment + newAlignment);
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
      <ToggleButton value={0} className="grid gap-2 rounded-full w-full rounded-md normal-case font-rubik text-lg">
        {t("low")}
        <span className="font-sourceCode text-diaGray text-2xs">{t("low_reduce")}</span>
      </ToggleButton>
      <ToggleButton value={15} className="grid gap-2 rounded-full w-full rounded-md normal-case font-rubik text-lg">
        {t("moderate")}
        <span className="font-sourceCode text-diaGray text-2xs">{t("moderate_reduce")}</span>
      </ToggleButton>
      <ToggleButton value={30} className="grid gap-2 rounded-full w-full rounded-md normal-case font-rubik text-lg">
        {t("moderate")}
        <span className="font-sourceCode text-diaGray text-2xs">{t("high_reduce")}</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
