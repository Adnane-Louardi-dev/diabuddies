import React, { useEffect, useState } from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import Gender from "../../components/stepper/gender";
import BirthDate from "../../components/stepper/birthDate";
import Tall from "../../components/stepper/tall";
import Weight from "../../components/stepper/weight";
import InsulinSensitivity from "../../components/stepper/insulinSensitivity";
import Hb1ac from "../../components/stepper/hb1ac";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getDir } from "../../utils/getDir";
import withAuth from "../../components/layout/withAuth";
import LanguageChanger from "../../components/stepper/languageChanger";
const steps = [<LanguageChanger />, <Gender />, <BirthDate />, <Tall />, <Weight />, <InsulinSensitivity />, <Hb1ac />];

const Setup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { i18n, t } = useTranslation();
  const [data, setData] = useState({
    height: { value: null, unit: "cm" },
    weight: { value: null, unit: "kg" },
    birthDate: moment(),
    gender: "male",
    insulinSensitivity: { value: null, unit: "mg/dL/1ui" },
    hb1ac: { value: null, unit: "IFCC" },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const handlePOSTSetupUser = async () => {
    await queryClient.cancelQueries(["getCurrentUser"]);
    const oldUser = queryClient.getQueryData(["getCurrentUser"]);
    oldUser.data.newUser = false;
    queryClient.setQueryData(["getCurrentUser"], oldUser);
    await axios
      .post(
        "/api/user/diabeticDetails",
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => {
        queryClient.invalidateQueries(["getCurrentUser"]);
      })
      .catch((err) => console.log(err));
    router.push("/app");
  };

  const handleSetupAbortion = async () => {
    await queryClient.cancelQueries(["getCurrentUser"]);
    const oldUser = queryClient.getQueryData(["getCurrentUser"]);
    oldUser.data.newUser = false;
    queryClient.setQueryData(["getCurrentUser"], oldUser);
    await axios
        .post("/api/user",
            {newUser: false})
        .then(() => {
          queryClient.invalidateQueries(["getCurrentUser"]);
        })
        .catch((err) => console.log(err));
    router.push("/app");
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

  useEffect(() => {
    console.log(data);
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#1e293b",
          },

          backgroundColor: "#3AB0FF",
        }}
        variant="determinate"
        value={(activeStep / steps.length) * 100}
      />
      <div className="flex justify-between" dir={getDir(i18n.language)}>
        <Button onClick={handleBack} disabled={activeStep === 0} className={`grid items-center m-3 bg-diaDarkBlue text-white   ${activeStep === 0 ? "text-diaLightGray" : "text-diaGray"}  rounded-2xl`}>
          <Icon icon={"material-symbols:chevron-right-rounded"} className="h-10 w-10" />
        </Button>
        {activeStep !== steps.length && (
          <Button onClick={handleNext} className="m-3 p-5  rounded-2xl font-tajawal font-semibold bg-diaDarkBlue text-white">
            {i18n.language === "ar" ? "لاحقا" : "Skip"}
          </Button>
        )}
      </div>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ width: "100%" }}>
            <div className="flex flex-col justify-center items-center text-center my-20">
              <Image src={"/undraw_Completing.png"} height={600} width={300} alt={"diabuddies logo"} className="rounded-full" />
              <div className="my-5 px-2">
                <h2 className="text-2xl font-tajawal font-semibold">{t("finished_setup")}</h2>
                <p className="font-tajawal font-semibold text-diaGray text-sm my-2">{t("finished_setup_detail")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 absolute bottom-10 left-[50%] translate-x-[-50%] w-full">
              <div className="px-5">
                <Button onClick={handlePOSTSetupUser} className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white font-tajawal font-semibold font-xl">
                  {t("setup_my_app")}
                </Button>
              </div>
              <Button onClick={handleSetupAbortion} className="font-tajawal text-diaGray">
                {t("cancel")}
              </Button>
            </div>
          </Box>
        </>
      ) : (
        <>
          <div>{React.isValidElement(steps[activeStep]) ? React.cloneElement(steps[activeStep], { data: data, setData: setData }) : steps[activeStep]}</div>
          <div className="absolute bottom-10 left-[50%] translate-x-[-50%] grid items-center justify-center">
            <Button
              onClick={() => {
                setActiveStep(activeStep + 1);
              }}
              className="grid items-center justify-center h-20 w-20 m-5 rounded-full bg-diaDarkBlue text-white shadow-lg"
            >
              <Icon icon={"material-symbols:chevron-right-rounded"} className="h-14 w-14" />
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default withAuth(Setup);
