import React from "react";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "next-i18next";
import {getNumberFromTextInput} from "../../utils/utils";

const Weight = ({ data, setData }) => {
  const { i18n, t } = useTranslation();
  const handleWeightUnitChange = (_, newWeightUnit) => {
    setData((oldData) => ({ ...oldData, weight: { ...oldData.weight, unit: newWeightUnit } }));
  };
  const handleWeightValueChange = (event) => {
    setData((oldData) => ({ ...oldData, weight: { ...oldData.weight, value: getNumberFromTextInput(event.target.value)}}));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        {i18n.language !== "ar" && (
          <h1 className="font-semibold font-poppins text-xl">
            What about your <span className="decoration-none font-bold text-diaBlue">Weight</span> ?
          </h1>
        )}
        {i18n.language === "ar" && (
          <h1 className="font-tajawal font-semibold text-xl">
            ماذا عن <span className="decoration-none font-bold text-diaBlue">وزنك</span> ؟
          </h1>
        )}
        {i18n.language !== "ar" && (
          <p className="my-3 font-rubik text-gray-400">
            that's will help us too
            <br />
            to estimate your kcal needs
          </p>
        )}
        {i18n.language === "ar" && (
          <p className="my-3 font-tajawal font-semibold text-gray-400">
            هدا سيساعدنا على كذلك <br />
            حساب احتياجك من السعرات الحرارية
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
          value={data.weight.unit}
          exclusive
          onChange={handleWeightUnitChange}
        >
          <ToggleButton value="lbs" className="rounded-full font-tajawal font-semibold">
            {t("lbs")}
          </ToggleButton>
          <ToggleButton value="kg" className="rounded-full font-tajawal font-semibold">
            {t("kg")}
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 items-center justify-center p-2 bg-diaBlue rounded-3xl shadow-md">
          <TextField
            onChange={handleWeightValueChange}
            id="outlined-number"
            value={data.weight.value}
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
