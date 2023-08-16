import * as React from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { NutrationLogInput } from "./NutrationLogInput";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.getContrastText(theme.palette.primary.main))}" d="M5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031V18Zm7-16c4.97 0 9 4.043 9 9.031V20H3v-8.969C3 6.043 7.03 2 12 2ZM9.5 21h5a2.5 2.5 0 0 1-5 0Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="18" viewBox="0 0 14 14"%3E%3Cpath fill="${encodeURIComponent(theme.palette.getContrastText(theme.palette.primary.main))}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m.5 13.5l13-13M6 13.5h2M8.73.84A4.51 4.51 0 0 0 2.5 5v2.5M3 11h10.5a2 2 0 0 1-2-2V5a4.42 4.42 0 0 0-.5-2"%2F%3E%3C%2Fsvg%3E')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function NewLogDialog() {
  const [InsulinType, setInsulinType] = React.useState("short");

  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(moment());
  const [Alignment, setAlignment] = React.useState("other");
  const [data, setData] = React.useState({
    time: dateValue._d,
    meal: Alignment,
    kcal: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });
  const queryClient = useQueryClient();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const {
    mutate: addNewLogBook,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["addNewLogBook"],
    mutationFn: (data) => {
      return axios.post("/api/logbook", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["indexChart"]);
    },
    onError: (e) => {
      console.error(e);
    },
    onSettled: () => {
      setNotificationOpen(true);
    },
  });
  //handle post new log
  const handlePOSTNewLog = async () => {
    setDateOpen(false);
    await addNewLogBook(data);
  };

  React.useEffect(() => {
    setData({ ...data, meal: Alignment });
  }, [Alignment]);

  const handleClose = () => {
    setNotificationOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CircularProgress hidden={!isLoading} />
      </Box>
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={isError ? "error" : "success"} sx={{ width: "100%" }}>
          {isError ? "There was an error while saving log book" : "Log book was added successfully"}
        </Alert>
      </Snackbar>
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
          <section>
            <ToggleButtonGroup
              className="w-full overflow-scroll no-scrollbar"
              sx={{
                "& .MuiButtonBase-root-MuiToggleButton-root": {
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
              value={Alignment}
              exclusive
              onChange={(event, newAlignment) => {
                setAlignment(newAlignment);
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
          </section>
          <section className="flex items-center justify-around my-3">
            <button variant="outlined" className="grid w-36 justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
              <h2 className="font-rubik text-sm text-diaDarkBlue my-2">Scan a barcode</h2>
              <Icon icon="material-symbols:barcode" className="h-10 w-10 text-diaDarkBlue" />
            </button>
            <button variant="outlined" className="grid w-36  justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
              <h2 className="font-rubik text-sm text-diaDarkBlue my-2">Search for a meal</h2>
              <Icon icon="tabler:search" className="h-10 w-10 text-diaDarkBlue" />
            </button>
          </section>
          <div className="flex justify-between items-center">
            <h3 className="font-sourceCode text-diaGray text-md">Meal's info</h3>
            <h3 className="font-sourceCode text-diaGreen text-sm">{`${data.kcal} KCal`}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 my-3">
            <NutrationLogInput
              label={"Glucose"}
              textColor={"text-blue-400"}
              bgColor={"bg-blue-400"}
              icon={"system-uicons:cubes"}
              inputAdornmentLabel={"mg/dL"}
              onChange={(event) => {
                setData({ ...data, glucose: parseFloat(event.target.value) });
              }}
            />
            <NutrationLogInput
              label={"Carbs"}
              textColor={"text-gray-400"}
              bgColor={"bg-gray-400"}
              icon={"fluent:food-grains-20-regular"}
              inputAdornmentLabel={"g"}
              onChange={(event) => {
                if (event.target.value) {
                  setData({ ...data, carbs: parseFloat(event.target.value), kcal: data.protein * 4 + data.fat * 9 + parseFloat(event.target.value) * 4 });
                } else {
                  setData({ ...data, carbs: 0, kcal: data.kcal - data.carbs * 4 });
                }
              }}
            />
            <div className={`p-2.5 bg-diaDarkBlue rounded-xl shadow-md col-span-2`}>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <Icon icon={"fluent:syringe-20-regular"} className={`bg-white text-diaDarkBlue rounded-full self-center m-1 p-1 h-7 w-7`} />
                  <p className="text-white font-rubik font-sm self-center">{"Insulin"}</p>
                </div>
                <div className="flex justify-around items-center">
                  <Android12Switch defaultChecked={false} />
                  <Icon icon="ri:notification-line" className="bg-diaOrange text-white rounded-full h-7 w-7 p-1" />
                </div>
              </div>
              <TextField
                id="outlined-number"
                type="tel"
                variant="standard"
                placeholder="0"
                sx={{
                  marginY: 2,
                  marginX: 1,
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
                      Dose
                    </InputAdornment>
                  ),
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
                      UI
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                  },
                }}
                onChange={(event) => {
                  if (InsulinType === "bolus") {
                    setData({ ...data, bolus: parseFloat(event.target.value) });
                  } else {
                    setData({ ...data, basal: parseFloat(event.target.value) });
                  }
                }}
              />
              <div className="flex items-center justify-center mb-3">
                <ToggleButtonGroup
                  color="primary"
                  value={InsulinType}
                  exclusive
                  onChange={(event, newAlignment) => {
                    if (newAlignment != null) {
                      setInsulinType(newAlignment);
                    }
                  }}
                  aria-label="Platform"
                  sx={{
                    backgroundColor: "white",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 3,
                    width: "full",
                    borderRadius: "25px",
                    justifyContent: "space-between",
                    "& .MuiToggleButtonGroup-root , .MuiButtonBase-root": {
                      paddingY: "5px",
                      color: "#FFB562",
                    },
                    "& .MuiToggleButtonGroup-grouped:not(:last-of-type),.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                      borderRadius: "25px",
                    },
                    "& .MuiButtonBase-root[aria-pressed='true']": {
                      backgroundColor: "#FFB562",
                      color: "white",
                    },
                  }}
                >
                  <ToggleButton value="short">Short</ToggleButton>
                  <ToggleButton value="long">Long</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <NutrationLogInput
              label={"Protein"}
              textColor={"text-amber-300"}
              bgColor={"text-amber-300"}
              icon={"fluent-emoji-high-contrast:cut-of-meat"}
              inputAdornmentLabel={"g"}
              onChange={(event) => {
                if (event.target.value) {
                  setData({ ...data, protein: parseFloat(event.target.value), kcal: data.carbs * 4 + data.fat * 9 + parseFloat(event.target.value) * 4 });
                } else {
                  setData({ ...data, protein: 0, kcal: data.kcal - data.protein * 4 });
                }
              }}
            />
            <NutrationLogInput
              label={"Fat"}
              textColor={"text-red-400"}
              bgColor={"bg-red-400"}
              icon={"circum:pizza"}
              inputAdornmentLabel={"g"}
              onChange={(event) => {
                if (event.target.value) {
                  setData({ ...data, fat: parseFloat(event.target.value), kcal: data.carbs * 4 + data.protein * 4 + parseFloat(event.target.value) * 9 });
                } else {
                  setData({ ...data, fat: 0, kcal: data.kcal - data.fat * 9 });
                }
              }}
            />
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
          <Button disabled={isLoading} onClick={handlePOSTNewLog} variant="filled" className="flex justify-center px-2 mx-4 font-rubik text-white bg-diaGray hover:bg-opacity-75 rounded-lg shadow-md">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
