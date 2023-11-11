import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "next-i18next";
import React from "react";
import {getNumberFromTextInput} from "../../utils/utils";

const Tall = ({ data, setData }) => {
  const { i18n, t } = useTranslation();
  const handleHeightUnitChange = (_, newHeightUnit) => {
    setData((oldData) => ({ ...oldData, height: { ...oldData.height, unit: newHeightUnit } }));
  };
  const handleHeightValueChange = (event) => {
    setData((oldData) => ({ ...oldData, height: { ...oldData.height, value: getNumberFromTextInput(event.target.value)}}));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        {i18n.language !== "ar" && (
          <h1 className="font-semibold font-poppins text-xl">
            How <span className="decoration-none font-bold text-diaBlue">Tall</span> are you ?
          </h1>
        )}
        {i18n.language === "ar" && (
          <h1 className="font-tajawal font-semibold text-xl">
            كم هو <span className="decoration-none font-bold text-diaBlue">طولك</span> ؟
          </h1>
        )}
        {i18n.language !== "ar" && (
          <p className="my-3 font-rubik text-gray-400">
            that's will help us
            <br />
            to estimate your kcal needs
          </p>
        )}
        {i18n.language === "ar" && (
          <p className="my-3 font-tajawal font-semibold text-gray-400">
            هدا سيساعدنا على <br />
            حساب احتياجك من السعرات الحرارية{" "}
          </p>
        )}
      </div>
      <div className="grid items-center justify-center text-center mx-16 my-5 py-8">
        <ToggleButtonGroup
          className="grid grid-cols-2 gap-5 mx-5 py-5"
          sx={{
            "& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected": {
              backgroundColor: "#3AB0FF",
              border: "none",
              color: "white",
            },
          }}
          value={data.height.unit}
          exclusive
          onChange={handleHeightUnitChange}
        >
          <ToggleButton value="ft" className="rounded-full font-tajawal font-semibold">
            {t("ft")}
          </ToggleButton>
          <ToggleButton value="cm" className="rounded-full font-tajawal font-semibold">
            {t("cm")}
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 items-center justify-center p-2 bg-diaBlue rounded-3xl shadow-md">
          <TextField
            onChange={handleHeightValueChange}
            id="outlined-number"
            variant="standard"
            placeholder="0"
            value={data.height.value}
            // error={typeof data.height.value !== "number"}
            // helperText={typeof data.height.value !== "number" ? "Please provide a valid number (use . instead of ,)" : ""}
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
