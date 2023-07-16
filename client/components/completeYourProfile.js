import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
const CompleteYourProfile = () => {
  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow-md">
        <div className="flex justify-between">
          <div>
            <h4 className="text-2xl font-medium font-poppins">Complete Your Profile</h4>
            <p className="text-md font-medium p-1">for better diabetes management provide us your vitals</p>
          </div>
          <div className="pt-1">
            <Icon icon="ph:x-bold" className="text-diaGray h-5 w-5" />
          </div>
        </div>
        <div>
          <LinearProgress variant="determinate" value={30} />
        </div>
        <div>
          <Button className="bg-diaBlue rounded-md">Do it</Button>
        </div>
      </div>
    </>
  );
};

export default CompleteYourProfile;
