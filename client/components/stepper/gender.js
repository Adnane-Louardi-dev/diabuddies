import { Stepper, Box, Step, StepContent, LinearProgress, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
const Gender = () => {
  const [Gender, setGender] = useState("male");
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        <h1 className="font-semibold font-poppins text-xl">
          What's your <span className="decoration-none font-bold text-diaBlue">gender</span> sweety?
        </h1>
        <p className="my-3 font-rubik text-gray-400">
          we will use this data for a better <br />
          management for you
        </p>
      </div>
      <div className="flex justify-around mt-10">
        <ToggleButtonGroup
          value={Gender}
          exclusive
          onChange={(event, newGender) => {
            setGender(newGender);
          }}
          aria-label="text alignment"
          className="grid grid-cols-2 p-5"
        >
          <ToggleButton value="female" className="grid rounded-xl self-center shadow-md mx-5">
            <Image src={"/female_avatar_diaBlue.png"} height={250} width={120} alt={"blue illustration of female character"} />
            <div className="m-5">
              <h5 className="font-poppins font-semibold">Female</h5>
            </div>
          </ToggleButton>
          <ToggleButton value="male" className="grid rounded-xl self-center shadow-md mx-5" alt={"blue illustration of male character"}>
            <Image src={"/male_avatar_diaBlue.png"} height={250} width={120} />
            <div className="m-5">
              <h5 className="font-poppins font-semibold">Male</h5>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </section>
  );
};

export default Gender;
