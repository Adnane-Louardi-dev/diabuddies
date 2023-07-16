import React, {useEffect, useState} from "react"
import {Box, Button, LinearProgress} from "@mui/material";
import {Icon} from "@iconify/react";
import Gender from "../components/stepper/gender";
import BirthDate from "../components/stepper/birthDate";
import Tall from "../components/stepper/tall";
import Weight from "../components/stepper/weight";
import InsulinSensitivity from "../components/stepper/insulinSensitivity";
import Hb1ac from "../components/stepper/hb1ac";
import axios from "axios";
import {useRouter} from "next/router";
import Image from "next/image";
import moment from "moment";

const steps = [<Gender />, <BirthDate />, <Tall />, <Weight />, <InsulinSensitivity />, <Hb1ac />];

const Setup = () => {
    const router = useRouter();
    const [data, setData] = useState({
        height: {value: null, unit: "cm"},
        weight: {value: null, unit: "kg"},
        birthDate: moment(),
        gender: "male",
        insulinSensitivity: {value: 0, unit: "mg/dL/1ui"},
        hb1ac: {value: 0, unit: "IFCC"},
    })

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const handlePOSTSetupUser = async () => {
        axios
            .post(
                "/api/user/",
                {...data, newUser: false},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        router.push("/");
    };

    const handleSetupAbortion = () => {
        router.push("/");
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
        console.log(data)
    }, [activeStep])

    return (
        <Box sx={{width: "100%"}}>
            <LinearProgress
                sx={{
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "#3AB0FF",
                    },
                }}
                variant="determinate"
                value={(activeStep / steps.length) * 100}
            />
            <div className="flex justify-between">
                <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    className={`grid items-center m-3 p-5 bg-diaLightBlue  ${activeStep === 0 ? "text-gray-300" : "text-diaBlue"}  rounded-2xl`}
                >
                    <Icon icon="material-symbols:arrow-back-ios-new-rounded" className="h-5 w-5" />
                </Button>
                {activeStep !== steps.length && (
                    <Button onClick={handleNext} className="m-3 p-5 bg-diaLightBlue rounded-2xl font-poppins font-semibold text-diaBlue">
                        Skip
                    </Button>
                )}
            </div>
            {activeStep === steps.length ? (
                <>
                    <Box sx={{ width: "100%" }}>
                        <div className="flex flex-col justify-center items-center text-center my-20">
                            <Image src={"/undraw_Completing.png"} height={600} width={300} alt={"diabuddies logo"} className="rounded-full" />
                            <div className="my-5">
                                <h2 className="text-2xl font-poppins font-semibold">All is done</h2>
                                <p className="font-poppins text-diaGray text-sm">It is now very easy to reach the best results of management of your diabetes</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 absolute bottom-10 left-[50%] translate-x-[-50%] w-full">
                            <div className="px-5">
                                <Button onClick={handlePOSTSetupUser} className="w-full p-3 rounded-3xl shadow-md bg-gray-800 text-white font-poppins font-xl">
                                    Setup my app
                                </Button>
                            </div>
                            <Button onClick={handleSetupAbortion} className="font-poppins text-diaGray">
                                Cancel
                            </Button>
                        </div>
                    </Box>
                </>
            ) : (
                <>
                    <div>{
                        React.isValidElement(steps[activeStep]) ?
                            React.cloneElement(steps[activeStep], {data: data, setData: setData}) :
                            steps[activeStep]
                    }</div>
                    <div className="absolute bottom-10 left-[50%] translate-x-[-50%] grid items-center justify-center">
                        <Button
                            onClick={() => {
                                setActiveStep(activeStep + 1);
                            }}
                            className="grid items-center justify-center h-20 w-20 m-5 p-5 rounded-full bg-diaLightBlue text-diaBlue"
                        >
                            <Icon icon="material-symbols:arrow-forward-ios-rounded" className="h-7 w-7"/>
                        </Button>
                    </div>
                </>
            )}
        </Box>
    );
};

export default Setup;
