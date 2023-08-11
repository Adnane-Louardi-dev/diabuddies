import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";
import ActivityLevel from "./activityLevel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useGetCurrentUser } from "../customeHooks/useGetCurrentUser";
import moment from "moment";

function CalculatingBolus(carbs, ratio, InsulinSensitivity, IOBcarb, glucose = 120) {
  let IOBcorr = 0,
    IOB = IOBcarb + IOBcorr,
    target = 120,
    Glucose = glucose || 120,
    correction = (Glucose - target) / InsulinSensitivity,
    bolus = carbs / ratio + correction;
  if (Glucose > target && correction <= IOBcarb) {
    correction = -IOBcorr;
  }
  if (Glucose > target && correction > IOBcarb) {
    correction -= IOB;
  }
  if (Glucose <= target) {
    correction -= IOBcorr;
  }
  return bolus;
}

const CarbsCountingDialog = ({ activeInsulinProp, glucose, lastInjectionTime }) => {
  const { user } = useGetCurrentUser();
  const [Glucose, setGlucose] = useState(glucose);
  const [activeInsulin, setActiveInsulin] = useState(0);
  const [carbsRatio, setcarbsRatio] = useState(user.carbsRatio);
  const [insulinSensitivity, setinsulinSensitivity] = useState(user.insulinSensitivity.value);
  let actingTime = 3;
  let actingTimeDateFormat = moment(lastInjectionTime, "LLL").add(actingTime, "hours").format();
  let diffBetweenNowAndLastInjection = moment().diff(lastInjectionTime, "minutes");
  const [NextMealTimer, setNextMealTimer] = useState(
    moment().diff(lastInjectionTime, "minutes") > actingTime * 60
      ? 0
      : moment(actingTimeDateFormat).subtract(diffBetweenNowAndLastInjection, "minutes").fromNow()
  );
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

  useEffect(() => {
    setActiveInsulin(activeInsulinProp);
    let bolus = CalculatingBolus(Macros.carbs, carbsRatio, insulinSensitivity, activeInsulin, Glucose);
    setbolusDose(bolus?.toFixed(2));
    console.log(Macros.carbs);
  }, [activeInsulinProp, carbsRatio, insulinSensitivity, Glucose, Macros.carbs]);

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

            {bolusDose ? (
              <section className="py-4">
                <div className="grid gap-4 rounded-xl shadow-md p-4 bg-diaLightGreen">
                  <h3 className="font-sourceCode text-xl text-diaGray">Total bolus</h3>
                  {bolusDose < 0 ? (
                    <div className="flex items-center px-2 rounded-lg bg-diaRed shadow-md">
                      <Icon icon="ph:warning" className="h-10 w-10 text-white m-1" />
                      <span className="mx-2 w-full text-xs font-poppins text-white">Correct your Blood Sugar immediatly</span>
                    </div>
                  ) : (
                    <p className="font-sourceCode font-2xl text-gray-800 mx-4">{bolusDose} UI</p>
                  )}
                </div>
              </section>
            ) : null}
            <section className="flex justify-around my-5">
              <div className="flex w-full mx-2 p-4 bg-gray-200 rounded-md shadow-sm">
                <Icon icon="fluent:syringe-20-regular" className="bg-white text-diaBlue rounded-full self-center mr-2 p-1 h-10 w-10" />
                <div className="grid">
                  <span className="self-center font-rubik text-2xs text-diaGray">Active Insulin</span>
                  <span className="self-center font-rubik text-md">{activeInsulin?.toFixed(2)} UI</span>
                </div>
              </div>
              <div className="flex w-full mx-3 p-4 bg-gray-200 rounded-md shadow-sm">
                <Icon icon="mingcute:time-fill" className="bg-white text-diaRed rounded-full self-center mr-2 p-1 h-10 w-10" />
                {NextMealTimer != 0 ? (
                  <div className="grid">
                    <span className="self-center font-rubik text-2xs text-diaGray">next meal in</span>
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
              {activeInsulin != 0 ? (
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
                      defaultValue={user.carbsRatio}
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
                      defaultValue={user.insulinSensitivity.value}
                      onChange={(newInsulinSensitivity) => setinsulinSensitivity(parseFloat(newInsulinSensitivity.target.value))}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: 20,
                          fontStyle: "bold",
                          textAlign: "center",
                        },
                      }}
                    />{" "}
                    <span className="text-sm">{user.insulinSensitivity.unit}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-3 my-5">
              <div className="flex justify-between rounded-xl shadow-md items-center bg-gray-200 p-2">
                <span className="mx-7">Glucose({user.unit})</span>
                <TextField
                  id="standard-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  className="w-16 mx-7"
                  placeholder={"00"}
                  onChange={(newGlucoseValue) => setGlucose(parseFloat(newGlucoseValue.target.value))}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 16,
                      fontStyle: "bold",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <h3 className="font-sourceCode text-diaGray">Macros</h3>
              <div className="flex justify-between rounded-xl shadow-md items-center bg-gray-200 p-2">
                <span className="mx-7">Carbs(g)</span>
                <TextField
                  id="standard-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  className="w-16 mx-7"
                  placeholder={"00"}
                  onChange={(newCarbsValue) => setMacros({ ...Macros, carbs: parseFloat(newCarbsValue.target.value) })}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 16,
                      fontStyle: "bold",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div className="flex justify-between rounded-xl shadow-md items-center bg-gray-200 p-2">
                <span className="mx-7">Protein(g)</span>
                <TextField
                  id="standard-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  className="w-16 mx-7"
                  placeholder={"00"}
                  onChange={(newProteinValue) => setMacros({ ...Macros, protein: parseFloat(newProteinValue.target.value) })}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 16,
                      fontStyle: "bold",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              <div className="flex justify-between rounded-xl shadow-md items-center bg-gray-200 p-2">
                <span className="mx-7">Fat(g)</span>
                <TextField
                  id="standard-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  className="w-16 mx-7"
                  placeholder={"00"}
                  onChange={(newFatValue) => setMacros({ ...Macros, fat: parseFloat(newFatValue.target.value) })}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 16,
                      fontStyle: "bold",
                      textAlign: "center",
                    },
                  }}
                />
              </div>
              {/* <Accordion className="my-5">
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" className="grid items-center">
                <Icon icon="ic:round-expand-more" className="h-7 w-7 text-diaGray" />
              </AccordionSummary>
              <AccordionDetails className="grid gap-2">
                <div className="flex justify-around rounded-xl shadow-md items-center bg-gray-200 p-2">
                  <span>Protein(g)</span>
                  <TextField
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </div>
                <div className="flex justify-around rounded-xl shadow-md items-center bg-gray-200 p-2">
                  <span>Fat(g)</span>
                  <TextField
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </div>
              </AccordionDetails>
            </Accordion> */}
            </section>
            <section className="grid gap-3 rounded-xl my-5 py-2">
              <h3 className="font-sourceCode text-diaGray">Activity Level</h3>
              <ActivityLevel />
            </section>
            <section className="grid gap-3 rounded-xl my-5 py-2">
              <h3 className="font-sourceCode text-diaGray">Sickness Factor</h3>
              <ActivityLevel />
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
