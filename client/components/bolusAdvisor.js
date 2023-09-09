import React from "react";
import carbs_counting from "../public/carbs-counting.png";
import CarbsCountingDialog from "./carbsCountingDialog";
import {useTranslation} from "next-i18next";
const BolusAdvisor = ({ activeInsulin, glucose, lastInjectionTime }) => {
    const {t} = useTranslation("index")
  return (
    <div className="my-5">
      <div
        className="p-4 rounded-xl shadow-md bg-diaLightBlue"
        style={{
          backgroundImage: `url(${carbs_counting.src})`,
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "95%",
          backgroundPositionY: 10,
        }}
      >
        <h2 className="font-sourceCode text-2xl font-semibold text-white">
            {t("hero_text")}
        </h2>
        <CarbsCountingDialog activeInsulinProp={activeInsulin} glucose={glucose} lastInjectionTime={lastInjectionTime} />
      </div>
    </div>
  );
};

export default BolusAdvisor;
