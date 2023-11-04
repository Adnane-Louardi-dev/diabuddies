import React from "react";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "next-i18next";

const Hb1ac = ({ data, setData }) => {
  const { i18n } = useTranslation();
  const handleHb1acUnitChange = (_, newHb1acUnit) => {
    setData((oldData) => ({ ...oldData, hb1ac: { ...oldData.hb1ac, unit: newHb1acUnit } }));
  };
  const handleHb1acValueChange = (event) => {
    setData((oldData) => ({ ...oldData, hb1ac: { ...oldData.hb1ac, value: event.target.value } }));
  };

  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        {i18n.language !== "ar" && (
          <h1 className="font-semibold font-poppins text-xl">
            What about your last <span className="decoration-none font-bold text-diaBlue">Hb1ac</span> ?
          </h1>
        )}
        {i18n.language === "ar" && (
          <h1 className="font-tajawal font-semibold text-xl">
            ?
            <span className="decoration-none font-bold text-diaBlue">
              <span dir={"ltr"}> (Hb1ac) </span>
              <span dir={"rtl"}>اختبار للهيموغلوبين السكري</span>
            </span>{" "}
            ماذا عن قيمة آخر
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
          <p className="my-3 font-rubik text-gray-400">
            <span className="font-semibold">تجاوز هذا السؤال</span> إذا كنت لا تعرفه
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
          value={data.hb1ac.unit}
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
            value={data.hb1ac.value}
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
