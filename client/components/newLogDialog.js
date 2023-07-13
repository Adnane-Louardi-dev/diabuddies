import * as React from "react";
import axios from "axios";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import { appendNewLog } from "../features/dataReducers/data";
import { useDispatch } from "react-redux";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function NewLogDialog() {
  const dispatch = useDispatch();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(moment());
  const [Alignment, setAlignment] = React.useState({
    firstAlignment: null,
    secondAlignment: null,
  });
  const [data, setData] = React.useState({
    time: dateValue._d,
    meal: `${Alignment.firstAlignment && ""} ${Alignment.secondAlignment || ""}`,
  });

  //handle post new log
  const handlePOSTNewLog = () => {
    setDateOpen(false);
    axios
      .post("/api/logbook", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((log) => dispatch(appendNewLog(log.data)))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    setData({ ...data, meal: `${Alignment.firstAlignment}  ${Alignment.secondAlignment}` });
  }, [Alignment]);

  return (
    <>
      <Button
        variant="filled"
        onClick={() => {
          setDateOpen(true);
        }}
        className="flex justify-between items-center text-diaBlue bg-diaBlue bg-opacity-25 pt-2 rounded-full shadow-md"
      >
        Add
        <Icon icon="material-symbols:add-circle-rounded" className="mx-1 mb-0.5" />
      </Button>
      <Dialog
        fullScreen
        open={dateOpen}
        onClose={() => {
          setDateOpen(false);
        }}
      >
        <DialogContent>
          {/* date pickers */}
          <MobileDateTimePicker
            className="w-full my-5"
            renderInput={(props) => (
              <TextField
                {...props}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon icon="ic:round-access-time-filled" className="h-7 w-7" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#F3FAFF",
                  "& fieldset": { borderRadius: 10, boxShadow: "0px 0px 20px -10px" },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontFamily: "poppins",
                  },
                }}
              />
            )}
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
              setData({ ...data, time: newValue._d });
            }}
            openTo="hours"
          />
          <div>
            <ToggleButtonGroup
              className="w-full flex justify-around"
              sx={{
                "& .MuiButtonBase-root": {
                  backgroundColor: "#F3FAFF",
                },
                "& .MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover": {
                  color: "#3AB0FF",
                },
                "& .MuiButtonBase-root[aria-pressed='true']": {
                  backgroundColor: "#3AB0FF",
                  color: "white",
                },
              }}
              value={Alignment.firstAlignment}
              exclusive
              onChange={(event, newAlignment) => {
                setAlignment({ ...Alignment, firstAlignment: newAlignment });
              }}
              aria-label="Platform"
            >
              <ToggleButton value="before" className="rounded-full border-none mx-1 px-4 mb-5 shadow-md">
                Before
              </ToggleButton>
              <ToggleButton value="post" className="rounded-full border-none mx-1 px-4 mb-5 shadow-md">
                Post
              </ToggleButton>
              <ToggleButton value="after" className="rounded-full border-none mx-1 px-4 mb-5 shadow-md">
                After
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              className="w-full overflow-scroll no-scrollbar"
              sx={{
                "& .MuiButtonBase-root": {
                  backgroundColor: "#F3FAFF",
                },
                "& .MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover": {
                  color: "#3AB0FF",
                },
                "& .MuiButtonBase-root[aria-pressed='true']": {
                  backgroundColor: "#3AB0FF",
                  color: "white",
                },
              }}
              value={Alignment.secondAlignment}
              exclusive
              onChange={(event, newAlignment) => {
                setAlignment({ ...Alignment, secondAlignment: newAlignment });
              }}
              aria-label="Platform"
            >
              <ToggleButton value="other" className="rounded-full border-none mr-3 mb-5 shadow-md">
                Other
              </ToggleButton>
              <ToggleButton value="breakfast" className="rounded-full border-none mr-3 mb-5 shadow-md">
                Breakfast
              </ToggleButton>
              <ToggleButton value="lunch" className="rounded-full border-none mr-3 mb-5 shadow-md">
                Lunch
              </ToggleButton>
              <ToggleButton value="snack" className="rounded-full border-none mr-3 mb-5 shadow-md">
                Snack
              </ToggleButton>
              <ToggleButton value="dinner" className="rounded-full border-none mr-3 mb-5 shadow-md">
                Dinner
              </ToggleButton>
              <ToggleButton value="sport" className="rounded-full border-none mr-3 mb-5 shadow-md">
                Sport
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="grid grid-cols-2 gap-2 my-7">
            {/* Glucose lvls */}
            <div className="p-2.5 bg-blue-400 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="system-uicons:cubes" className="bg-white text-blue-400 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">Glucose</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                        },
                      }}
                    >
                      mg/dL
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, glucose: parseFloat(event.target.value) });
                }}
              />
            </div>

            {/* carbs */}
            <div className="p-2.5 bg-gray-400 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="fluent:food-grains-20-regular" className="bg-white text-gray-400 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">Carbs</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                          marginRight: 1,
                        },
                      }}
                    >
                      g
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, carbs: parseFloat(event.target.value) });
                }}
              />
            </div>

            {/* bolus */}
            <div className="p-2.5 bg-orange-300 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="fluent:syringe-20-regular" className="bg-white text-orange-300 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">bolus</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                          marginRight: 1,
                        },
                      }}
                    >
                      UI
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, bolus: parseFloat(event.target.value) });
                }}
              />
            </div>

            {/* basal */}
            <div className="p-2.5 bg-orange-300 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="fluent:syringe-20-regular" className="bg-white text-orange-300 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">basal</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                          marginRight: 1,
                        },
                      }}
                    >
                      UI
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, basal: parseFloat(event.target.value) });
                }}
              />
            </div>

            {/* protein */}
            <div className="p-2.5 bg-amber-300 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="fluent-emoji-high-contrast:cut-of-meat" className="bg-white text-amber-300 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">Protein</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                          marginRight: 1,
                        },
                      }}
                    >
                      g
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, protein: parseFloat(event.target.value) });
                }}
              />
            </div>

            {/* fat */}
            <div className="p-2.5 bg-red-400 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="circum:pizza" className="bg-white text-red-400 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">fat</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                          marginRight: 1,
                        },
                      }}
                    >
                      g
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, kcal: parseFloat(event.target.value) });
                }}
              />
            </div>

            {/* kcal */}
            <div className="p-2.5 bg-violet-400 rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="fluent-mdl2:calories" className="bg-white text-violet-400 rounded-full self-center m-1 p-1 h-7 w-7" />
                <p className="text-white font-rubik font-sm self-center">kcal</p>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginTop: 1,
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
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
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "white",
                          fontSize: 14,
                          marginRight: 1,
                        },
                      }}
                    >
                      kcal
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  setData({ ...data, kcal: parseFloat(event.target.value) });
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDateOpen(false);
            }}
            className="font-rubik text-diaGray"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePOSTNewLog}
            variant="filled"
            className="flex justify-center px-2 mx-4 font-rubik text-white bg-diaGray hover:bg-opacity-75 rounded-lg shadow-md"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
