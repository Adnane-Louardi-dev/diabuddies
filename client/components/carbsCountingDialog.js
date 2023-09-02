import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";
import ReduceFactors from "./reduceFactors";
import { useGetCurrentUserDetailed } from "../customeHooks/useGetCurrentUser";
import moment from "moment";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";

function CalculatingBolus(carbs, ratio, InsulinSensitivity, IOBcarb, glucose) {
  let IOBcorr = 0,
    IOB = IOBcarb + IOBcorr,
    target = 120,
    Glucose = glucose,
    localCarbs = carbs || 0,
    correction = (Glucose - target) / InsulinSensitivity;
  if (Glucose > target && correction <= IOBcarb) {
    correction = -IOBcorr;
  }
  if (Glucose > target && correction > IOBcarb) {
    correction -= IOB;
  }
  if (Glucose <= target) {
    correction -= IOBcorr;
  }
  return localCarbs / ratio + correction;
}

const CarbsCountingDialog = ({ activeInsulinProp, glucose, lastInjectionTime }) => {
  const { user } = useGetCurrentUserDetailed();
  const [localGlucose, setGlucose] = useState(glucose && user?.diabetecDetails.normalBloodGlucose.min);
  const [activeInsulin, setActiveInsulin] = useState(0);
  const [localLastInjectionTime] = useState(lastInjectionTime);
  const [carbsRatio, setcarbsRatio] = useState(user?.diabetecDetails.carbsRatio);
  const [insulinSensitivity, setinsulinSensitivity] = useState(user?.diabetecDetails.insulinSensitivity.value);
  const [reduceLevel, setreduceLevel] = useState(0);
  let actingTime = 3;
  let actingTimeDateFormat = moment(localLastInjectionTime)
    .add(actingTime * 60, "minutes")
    .format();
  let diffBetweenNowAndLastInjection = moment().diff(localLastInjectionTime, "minutes");
  const [NextMealTimer] = useState(diffBetweenNowAndLastInjection >= actingTime * 60 ? "Now" : moment(actingTimeDateFormat).startOf("minute").fromNow());
  const [Macros, setMacros] = useState({
    carbs: 0,
    protein: 0,
    fat: 0,
  });
  const [open, setOpen] = useState(false);
  const [bolusDose, setbolusDose] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(user);
  useEffect(() => {
    setActiveInsulin(activeInsulinProp);
    let bolus = CalculatingBolus(Macros.carbs, carbsRatio, insulinSensitivity, activeInsulin, localGlucose);
    setbolusDose(bolus);
  }, [activeInsulinProp, carbsRatio, insulinSensitivity, localGlucose, Macros.carbs, reduceLevel]);

  return (
    <div>
      <Button onClick={handleClickOpen} variant="filled" className="flex justify-end mt-3 text-diaLightBlue bg-white pt-2 rounded-full shadow-md">
        Calculate now
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle className="flex justify-between">
          <p className="font-sourceCode text-2xl text-gray-900">Bolus advisor</p>
          <Button onClick={handleClose} className="self-center p-2 bg-gray-100 rounded-md">
            <Icon icon="ic:round-close" className="h-5 w-5 text-diaGray" />
          </Button>
        </DialogTitle>
        {user ? (
          <DialogContent>
            <DialogContentText className="font-sourceCode text-sm text-diaGray">Calculate your macros and get the ideal bolus.</DialogContentText>

            {(localGlucose || Macros.carbs > 0) && bolusDose > 0 ? (
              <section className="py-4">
                <div className="grid gap-4 rounded-xl shadow-md p-4 bg-diaLightGreen">
                  <h3 className="font-sourceCode text-xl text-diaGray">Total bolus</h3>
                  <p className="font-sourceCode font-2xl text-gray-800 mx-4">{bolusDose.toFixed(2)} UI</p>
                </div>
              </section>
            ) : null}
            <section className="flex justify-around my-5">
              <div className="flex w-full mx-2 p-4 rounded-md shadow-lg">
                <Icon icon="fluent:syringe-20-regular" className="text-diaBlue rounded-full self-center mr-2 p-1 h-10 w-10" />
                <div className="grid">
                  <span className="self-center font-rubik text-2xs text-diaGray">Active Insulin</span>
                  <span className="self-center font-rubik text-md">{activeInsulin.toFixed(2)} UI</span>
                </div>
              </div>
              <div className="flex w-full mx-3 p-4 rounded-md shadow-lg">
                <Icon icon="mingcute:time-fill" className="text-diaRed rounded-full self-center mr-2 p-1 h-10 w-10" />
                {NextMealTimer !== 0 ? (
                  <div className="grid">
                    <span className="self-center font-rubik text-2xs text-diaGray">next meal's</span>
                    <span className="self-center font-rubik text-sm">{NextMealTimer}</span>
                  </div>
                ) : (
                  <div className="grid">
                    <span className="self-center  font-rubik text-xs text-diaGray">Your body is bolus free</span>
                  </div>
                )}
              </div>
            </section>
            <section className="px-2 mb-5">
              {activeInsulin !== 0 ? (
                <div className="flex items-center px-2 rounded-lg bg-diaRed shadow-md">
                  <Icon icon="ph:warning" className="h-10 w-10 text-white m-1" />
                  <span className="mx-2 w-full text-xs font-poppins text-white">It's recommended to wait until your blood stream is out of bolus insulin.</span>
                </div>
              ) : null}
            </section>
            <section className="grid gap-3 mb-5">
              <h3 className="font-sourceCode text-diaGray text-sm">Carbs Ratio & Insulin Sensitivity</h3>
              <div className="flex justify-around">
                <div className="grid gap-2 rounded-lg shadow-md w-full p-3 mx-1 text-diaGray bg-blue-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Icon icon="fluent:ratio-one-to-one-24-regular" className="h-7 w-7" />
                      <p className="mx-1 font-rubik text-sm">Carbs Ratio</p>
                    </div>
                  </div>
                  <div className="flex justify-around items-center">
                    <TextField
                      id="standard-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      className="w-10 font-sourceCode font-semibold text-3xl text-gray-800 text-center"
                      placeholder={"00"}
                      defaultValue={user.diabetecDetails.carbsRatio}
                      onChange={(newCarbsRatio) => setcarbsRatio(parseFloat(newCarbsRatio.target.value))}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: 20,
                          fontStyle: "bold",
                          textAlign: "center",
                        },
                      }}
                    />
                    <span className="text-sm">(g) per UI</span>
                  </div>
                </div>
                <div className="grid gap-2 rounded-lg shadow-md w-full p-3 mx-1 text-diaGray bg-blue-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Icon icon="mdi:feather" className="h-7 w-7" />
                      <p className="mx-1 font-rubik text-sm">Ins. Sensitivity</p>
                    </div>
                  </div>
                  <div className="flex justify-around items-center">
                    <TextField
                      id="standard-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      className="w-10 font-sourceCode font-semibold text-3xl text-gray-800 text-center"
                      placeholder={"00"}
                      defaultValue={user.diabetecDetails.insulinSensitivity.value}
                      onChange={(newInsulinSensitivity) => setinsulinSensitivity(parseFloat(newInsulinSensitivity.target.value))}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: 20,
                          fontStyle: "bold",
                          textAlign: "center",
                        },
                      }}
                    />
                    <span className="text-sm">{user.diabetecDetails.insulinSensitivity.unit}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg bg-blue-200 shadow-md">
                <Icon icon="tabler:bulb" className="h-8 w-8 text-white" />
                <span className="mx-2 w-full text-xs font-poppins text-diaGray">Learn how to calculate them by your self.</span>
                <Link href={"/blog/how-to-calculate-insulin-sensitivity-and-carbs-ratio"} aria-label="blog page" passHref>
                  <Icon icon="ep:arrow-right-bold" className="h-5 w-5 text-white" />
                </Link>
              </div>
            </section>

            <section className="grid gap-3 my-5">
              <div>
                <h3 className="font-sourceCode text-diaGray my-2">Glucose</h3>
                <TextField
                  id="outlined-number"
                  type="tel"
                  variant="standard"
                  placeholder="0"
                  sx={{
                    paddingX: "10px",
                    textAlign: "center",
                    borderRadius: "15px",
                    backgroundColor: "#334155",
                    width: "full",
                    "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: 25,
                      fontStyle: "bold",
                      width: "full",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          "& .MuiTypography-root": {
                            display: "flex",
                          },
                          marginRight: 3,
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        <Icon icon="ph:drop-light" className="text-white mx-1 h-5 w-5" />
                        Glucose({user.diabetecDetails.unit})
                      </InputAdornment>
                    ),
                    style: {
                      color: "white",
                    },
                  }}
                  onChange={(newGlucoseValue) => setGlucose(parseFloat(newGlucoseValue.target.value))}
                />
              </div>

              <div>
                <h3 className="font-sourceCode text-diaGray my-2">Macros</h3>
                <TextField
                  id="outlined-number"
                  type="tel"
                  variant="standard"
                  placeholder="0"
                  sx={{
                    paddingX: "10px",
                    textAlign: "center",
                    borderRadius: "15px",
                    backgroundColor: "#334155",
                    width: "full",
                    "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: 25,
                      fontStyle: "bold",
                      width: "full",
                      marginX: 5,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          "& .MuiTypography-root": {
                            display: "flex",
                          },
                          marginRight: 3,
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        <Icon icon="ph:drop-light" className="text-white mx-1 h-5 w-5" />
                        Carbs(g)
                      </InputAdornment>
                    ),
                    style: {
                      color: "white",
                    },
                  }}
                  onChange={(newCarbsValue) => setMacros({ ...Macros, carbs: parseFloat(newCarbsValue.target.value) })}
                />
              </div>
            </section>
            <section className="grid gap-3 rounded-xl my-5 py-2">
              <h3 className="font-sourceCode text-diaGray">Activity Level</h3>
              <ReduceFactors setreduceLevel={setreduceLevel} reduceLevel={reduceLevel} />
            </section>
            <section className="grid gap-3 rounded-xl my-5 py-2">
              <h3 className="font-sourceCode text-diaGray">Sickness Factor</h3>
              <ReduceFactors setreduceLevel={setreduceLevel} reduceLevel={reduceLevel} />
            </section>
          </DialogContent>
        ) : null}

        <DialogActions>
          <Button onClick={handleClose} className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white font-codeSource font-xl">
            Add it as a log
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CarbsCountingDialog;
