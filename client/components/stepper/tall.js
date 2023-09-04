import {TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useTranslation} from "next-i18next";
import React from "react";

const Tall = ({data, setData}) => {
    const {i18n,t} = useTranslation()
    const handleHeightUnitChange = (_, newHeightUnit) => {
        setData(oldData => ({...oldData, height: {...oldData.height, unit: newHeightUnit}}))
    };
    const handleHeightValueChange = (event) => {
        setData(oldData => ({...oldData, height: {...oldData.height, value: event.target.value}}))
    };

    return (
        <section>
            <div className="mt-24 grid items-center justify-center text-center">
                <h1 className="font-semibold font-poppins text-xl">
                    {i18n.language !== "ar" && <>How <span className="decoration-none font-bold text-diaBlue">Tall</span> are you ?</>}
                    {i18n.language === "ar" && <>كم هو  <span className="decoration-none font-bold text-diaBlue">طولك</span> ؟</>}
                </h1>
            </div>
      <div className="grid items-center justify-center text-center mx-16 my-16 py-8">
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
          <ToggleButton value="ft" className="rounded-full font-semibold">
              {t("ft")}
          </ToggleButton>
          <ToggleButton value="cm" className="rounded-full font-semibold">
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
