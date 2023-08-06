import * as React from "react";
import {useState} from "react";
import axios from "axios";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {Icon} from "@iconify/react";
import TextField from "@mui/material/TextField";
import {MobileDateTimePicker} from "@mui/x-date-pickers/MobileDateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Alert, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {NutrationLogInput} from "./NutrationLogInput";

export default function NewLogDialog() {
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
    setData({ ...data, meal: `${Alignment.firstAlignment}  ${Alignment.secondAlignment}` });
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
             <NutrationLogInput
                 label={"Glucose"}
                 color={"blue-400"}
                 icon={"system-uicons:cubes"}
                 inputAdornmentLabel={"mg/dL"}
                 onChange={(event) => {
                     setData({ ...data, glucose: parseFloat(event.target.value) });
                 }}
             />
             <NutrationLogInput
                 label={"Carbs"}
                 color={"gray-400"}
                 icon={"fluent:food-grains-20-regular"}
                 inputAdornmentLabel={"g"}
                 onChange={(event) => {
                     setData({ ...data, carbs: parseFloat(event.target.value) });
                 }}
             />
             <NutrationLogInput
                 label={"Bolus"}
                 color={"orange-300"}
                 icon={"fluent:syringe-20-regular"}
                 inputAdornmentLabel={"UI"}
                 onChange={(event) => {
                     setData({ ...data, bolus: parseFloat(event.target.value) });
                 }}
             />
             <NutrationLogInput
                 label={"Basal"}
                 color={"orange-300"}
                 icon={"fluent:syringe-20-regular"}
                 inputAdornmentLabel={"UI"}
                 onChange={(event) => {
                     setData({ ...data, basal: parseFloat(event.target.value) });
                 }}
             />
             <NutrationLogInput
                 label={"Protein"}
                 color={"amber-300"}
                 icon={"fluent-emoji-high-contrast:cut-of-meat"}
                 inputAdornmentLabel={"g"}
                 onChange={(event) => {
                     setData({ ...data, protein: parseFloat(event.target.value) });
                 }}
             />
             <NutrationLogInput
                 label={"Fat"}
                 color={"red-400"}
                 icon={"circum:pizza"}
                 inputAdornmentLabel={"g"}
                 onChange={(event) => {
                     setData({ ...data, fat: parseFloat(event.target.value) });
                 }}
             />
             <NutrationLogInput
                 label={"Kcal"}
                 color={"violet-400"}
                 icon={"fluent-mdl2:calories"}
                 inputAdornmentLabel={"kcal"}
                 onChange={(event) => {
                     setData({ ...data, kcal: parseFloat(event.target.value) });
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
          <Button
            disabled={isLoading}
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
