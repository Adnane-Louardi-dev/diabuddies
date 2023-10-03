import React from "react";
import CarbsCountingDialog from "./carbsCountingDialog";
import { useTranslation } from "next-i18next";
import Image from "next/image";
const BolusAdvisor = ({ activeInsulin, glucose, lastInjectionTime }) => {
  const { t } = useTranslation("index");
  return (
    <div className="flex content-end justify-center my-5 h-48 w-full shadow-xl rounded-3xl">
      <div className="flex relative w-full p-5">
        <Image src={"/carbs_counting.png"} alt={"image_diabuddies"} layout="fill" objectFit="cover" className="absolute top-0 left-0 bottom-0 right-0 rounded-3xl" />
        <div className="self-end">
          <CarbsCountingDialog activeInsulinProp={activeInsulin} glucose={glucose} lastInjectionTime={lastInjectionTime} />
        </div>
      </div>
      {/* <h2 className="font-sourceCode text-2xl font-semibold text-white">{t("hero_text")}</h2> */}
    </div>
  );
};

export default BolusAdvisor;
