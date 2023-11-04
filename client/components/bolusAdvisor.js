import React from "react";
import CarbsCountingDialog from "./carbsCountingDialog";
import { useTranslation } from "next-i18next";
import Image from "next/image";
const BolusAdvisor = ({ activeInsulin, glucose, lastInjectionTime }) => {
  const { t } = useTranslation("index");
  return (
    <div className="flex content-end justify-center my-5 h-48 w-full rounded-3xl">
      <div className="relative flex content-end justify-start p-5 h-full w-full">
        <Image src={"/carbs_counting.png"} alt={"image_diabuddies"} layout="fill" objectFit="cover" className="absolute top-0 left-0 bottom-0 right-0 rounded-3xl ring-2 ring-diaOrange" />
        <div className="self-end">
          <CarbsCountingDialog activeInsulinProp={activeInsulin} glucose={glucose} lastInjectionTime={lastInjectionTime} />
        </div>
      </div>
    </div>
  );
};

export default BolusAdvisor;
