import { Icon } from "@iconify/react";
import { Button, Chip } from "@mui/material";
import advice from "../utils/advice.json" assert { type: "json" };
import { useState, useEffect } from "react";
const Advice = () => {
  const [RandomIndex, setRandomIndex] = useState(Math.floor(Math.random() * advice.length));
  const [choosenAdvice, setchoosenAdvice] = useState(advice[RandomIndex]);
  useEffect(() => {
    setchoosenAdvice(advice[RandomIndex]);
  }, [RandomIndex]);
  return (
    <section className="p-2">
      <div className="grid gap-4 rounded-lg shadow-md p-4 bg-white">
        <div className="flex justify-between">
          <div>
            <h2 className="font-rubik font-semibold text-xl text-gray-800 mb-2">{choosenAdvice?.slug.replace(/-/g, " ")}</h2>
            {choosenAdvice.tags?.map((tag) => (
              <Chip avatar={<Icon icon="ic:round-tag" />} label={tag} className="mx-1" />
            ))}
          </div>
          <div onClick={() => setRandomIndex(Math.floor(Math.random() * advice.length + 1))} className="ring-1 ring-gray-500 rounded-md p-2 self-start">
            <Icon icon="ps:random" className="text-diaGray" />
          </div>
        </div>
        <p className="font-rubik text-diaGray text-md">{choosenAdvice.advice}</p>
      </div>
    </section>
  );
};

export default Advice;
