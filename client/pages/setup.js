import { Button, Box } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import Gender from "../components/stepper/gender";
import BirthDate from "../components/stepper/birthDate";
import Tall from "../components/stepper/tall";
import Weight from "../components/stepper/weight";

const steps = [<Gender />, <BirthDate />, <Tall />, <Weight />];

const Setup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isSkipAvailable, setisSkipAvailable] = useState(true);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     setisSkipAvailable(false);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  return (
    <Box sx={{ width: "100%" }}>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={() => {
                setActiveStep(0);
              }}
            >
              Reset
            </Button>
          </Box>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <Button onClick={handleBack} disabled={activeStep === 0} className="grid items-center m-3 p-5 bg-gray-200 text-gray-800 rounded-2xl">
              <Icon icon="material-symbols:arrow-back-ios-new-rounded" className="h-5 w-5" />
            </Button>
            <Button onClick={handleNext} className="m-3 p-5 bg-gray-200 rounded-2xl font-poppins font-semibold text-gray-800">
              Skip
            </Button>
          </div>
          <div>{steps[activeStep]}</div>
          <div className="absolute bottom-10 left-[50%] translate-x-[-50%] grid items-center justify-center">
            <Button
              onClick={() => {
                setActiveStep(activeStep + 1);
              }}
              className="grid items-center justify-center h-20 w-20 m-5 p-5 rounded-full bg-diaBlue text-white"
            >
              <Icon icon="material-symbols:arrow-forward-ios-rounded" className="h-7 w-7" />
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default Setup;
