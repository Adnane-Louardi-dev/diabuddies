import { Icon } from "@iconify/react";
import { Chip } from "@mui/material";
import adviceEn from "../utils/advice.json" assert { type: "json" };
import adviceAr from "../utils/advice_ar.json" assert { type: "json" };
import { useState, useEffect } from "react";
import {useTranslation} from "next-i18next";
const Advice = () => {
  const [advice, setAdvice] = useState(adviceEn)
  const [RandomIndex, setRandomIndex] = useState(Math.floor(Math.random() * advice.length));
  const [choosenAdvice, setchoosenAdvice] = useState(advice[RandomIndex]);
  const {i18n} = useTranslation()

  useEffect(() => {
    if(i18n.language === "ar"){
      setAdvice(adviceAr)
    } else {
      setAdvice(adviceEn)
    }
    setRandomIndex(Math.floor(Math.random() * advice.length))
  }, [i18n.language]);

  useEffect(() => {
    setchoosenAdvice(advice[RandomIndex]);
  }, [RandomIndex]);
  return (
      <section className="grid gap-4 rounded-xl shadow-md p-4 bg-white border-r-4 border-diaLightOrange">
        <div className="flex justify-between">
          <div>
            <h2 className="font-rubik font-semibold text-xl text-gray-800 mb-2">{choosenAdvice?.slug.replace(/-/g, " ")}</h2>
            {choosenAdvice?.tags.map((tag) => (
              <Chip avatar={<Icon icon="ic:round-tag" />} label={tag} className="mx-1 bg-diaLightOrange" />
            ))}
          </div>
          <div onClick={() => setRandomIndex(Math.floor(Math.random() * advice.length))} className="ring-1 ring-gray-500 rounded-md p-2 self-start cursor-pointer">
            <Icon icon="ps:random" className={`text-diaGray ${i18n.language === "ar" ? "rotate-180" : ""}`} />
          </div>
        </div>
        <p className="font-poppins text-diaGray text-lg">{choosenAdvice.advice}</p>
    </section>
  );
};

export default Advice;
