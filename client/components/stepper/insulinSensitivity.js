import React from "react";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "next-i18next";
import {getNumberFromTextInput} from "../../utils/utils";

const InsulinSensitivity = ({ data, setData }) => {
  const { i18n, t } = useTranslation();
  const handleInsulinSensitivityUnitChange = (_, newInsulinSensitivityUnit) => {
    setData((oldData) => ({
      ...oldData,
      insulinSensitivity: { ...oldData.insulinSensitivity, unit: newInsulinSensitivityUnit },
    }));
  };
  const handleInsulinSensitivityValueChange = (event) => {
    setData((oldData) => ({
      ...oldData,
      insulinSensitivity: { ...oldData.insulinSensitivity, value: getNumberFromTextInput(event.target.value)},
    }));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        {i18n.language !== "ar" && (
          <h1 className="font-semibold font-poppins text-xl">
            What about your <span className="decoration-none font-bold text-diaBlue">Insulin Sensitivity</span> ?
          </h1>
        )}
        {i18n.language === "ar" && (
          <h1 className="font-tajawal font-semibold text-xl">
            ماذا عن <span className="decoration-none font-bold text-diaBlue">حساسيتك للأنسولين</span> ؟
          </h1>
        )}
        {i18n.language !== "ar" && (
          <p className="my-3 font-rubik text-gray-400">
            <span className="font-semibold">Skip it</span> if you don't have an idea about it
            <br />
            don't worry, we gonna figure it out later
          </p>
        )}
        {i18n.language === "ar" && (
          <p className="my-3 font-tajawal font-semibold text-gray-400">
            <span className="font-bold">تجاوز هذا السؤال</span> إذا كنت لا تعرفه
            <br />
            لا تخف ستتعلم عنه فيما بعد ويمكنك تغييره
          </p>
        )}
      </div>
      <div className="grid items-center justify-center text-center mx-16 my-15 py-8">
        <ToggleButtonGroup
          className="grid grid-cols-2 gap-5 mx-2 py-5"
          sx={{
            "& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected": {
              backgroundColor: "#3AB0FF",
              border: "none",
              color: "white",
            },
          }}
          value={data.insulinSensitivity.unit}
          exclusive
          onChange={handleInsulinSensitivityUnitChange}
        >
          <ToggleButton value="mmol/L/1ui" className="rounded-full font-tajawal font-semibold">
            {t("mmol/L/1ui")}
          </ToggleButton>
          <ToggleButton value="mg/dL/1ui" className="rounded-full font-tajawal font-semibold">
            {t("mg/dL/1ui")}
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="grid grid-cols-1 items-center justify-center p-2 bg-diaBlue rounded-3xl shadow-md">
          <TextField
            onChange={handleInsulinSensitivityValueChange}
            id="outlined-number"
            variant="standard"
            placeholder="0"
            value={data.insulinSensitivity.value}
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

export default InsulinSensitivity;
