import {Icon} from "@iconify/react";
import React from "react";

export const MyActionComponent = ({ pointsEarned, label, labelAr, icon, lang }) => (
  <div className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer">
    <div className="self-start col-span-1 flex items-center justify-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
      <Icon icon={icon} className={"mx-auto text-white h-7 w-7"} />
    </div>
    <div className="grid grid-cols-3 col-span-5">
      {lang !== "ar" && (
        <div className="col-span-2">
          <h4 className="font-poppins text-diaDarkBlue text-lg">{label}</h4>
        </div>
      )}
      {lang === "ar" && (
        <div>
          <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{labelAr}</h4>
        </div>
      )}
      <div className="h-10 w-10 flex items-center justify-center w-full text-white rounded-xl bg-diaDarkBlue">
        <Icon icon="fluent:cube-24-regular" className={"h-6 w-6"} />
        <span className="font-sourceCode font-bold mx-2">{pointsEarned}</span>
      </div>
    </div>
  </div>
);
