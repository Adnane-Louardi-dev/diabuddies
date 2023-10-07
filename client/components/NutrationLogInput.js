import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import * as React from "react";
import { useTranslation } from "next-i18next";

export const NutrationLogInput = ({ onChange, label, bgColor, value, textColor, icon, inputAdornmentLabel }) => {
  const { t } = useTranslation();
  return (
    <div className={`p-2.5 bg-diaDarkBlue rounded-xl shadow-md`}>
      <div className="flex justify-between items-center">
        <div className="flex">
          <Icon icon={icon} className={`bg-slate-100 ${textColor} rounded-full self-center m-1 p-1 h-7 w-7`} />
          <p className={`${textColor} font-rubik font-sm self-center`}>{label}</p>
        </div>
        {/* <div className="flex">
          <IconButton aria-label="add an alarm">
            <Icon icon="ri:notification-line" className={`bg-white ${textColor} rounded-full self-center p-1 h-7 w-7`} />
          </IconButton>
        </div> */}
      </div>
      <TextField
        id="outlined-number"
        type="number"
        variant="standard"
        placeholder={"0"}
        value={value || ""}
        sx={{
          marginTop: 1,
          marginX: 1,
          textAlign: "center",
          border: "none",
          width: "full",
          "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
            display: "none",
          },
          "& .MuiInputBase-input": {
            fontSize: 25,
            fontStyle: "bold",
            width: "full",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                "& .MuiTypography-root": {
                  color: "white",
                  fontSize: 14,
                },
              }}
            >
              {t(inputAdornmentLabel)}
            </InputAdornment>
          ),
          style: {
            color: "white",
          },
        }}
        onChange={onChange}
      />
    </div>
  );
};
