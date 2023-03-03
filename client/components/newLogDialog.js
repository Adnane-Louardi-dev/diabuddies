import * as React from "react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

export default function NewLogDialog() {
  const router = useRouter();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(moment());
  const [meal, setMeal] = React.useState("");
  const [data, setData] = React.useState({
    time: dateValue._d,
  });
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
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
        open={dateOpen}
        onClose={() => {
          setDateOpen(false);
        }}
      >
        <DialogTitle className="border-b-2 mb-5">Add new log</DialogTitle>
        <DialogContent>
          {/* date pickers */}
          <DesktopDateTimePicker
            className="w-full my-5"
            renderInput={(props) => <TextField {...props} />}
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
              setData({ ...data, time: newValue._d });
              console.log(newValue);
            }}
          />
          {/* meal type */}
          <FormControl className="w-full my-5">
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={meal || "Other"}
              onChange={(event) => {
                setMeal(event.target.value || "");
                setData({ ...data, meal: event.target.value });
              }}
              input={<OutlinedInput />}
            >
              <MenuItem value={"Before Breakfast"}>Before Breakfast</MenuItem>
              <MenuItem value={"After Breakfast"}>After Breakfast</MenuItem>
              <MenuItem value={"Before Lunch"}>Before Lunch</MenuItem>
              <MenuItem value={"After Lunch"}>After Lunch</MenuItem>
              <MenuItem value={"Before Dinner"}>Before Dinner</MenuItem>
              <MenuItem value={"After Dinner"}>After Dinner</MenuItem>
              <MenuItem value={"Before Sport"}>Before Sport</MenuItem>
              <MenuItem value={"After Sport"}>After Sport</MenuItem>
              <MenuItem value={"Snack"}>Snack</MenuItem>
              <MenuItem value={"Fasting"}>Fasting</MenuItem>
              <MenuItem value={"Night"}>Night</MenuItem>
              <MenuItem value={"Before Bed"}>Before Bed</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>

          <div className="grid grid-cols-2 gap-2">
            {/* Glucose lvls */}
            <div className="p-2.5 bg-diaBlue rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="system-uicons:cubes" className="bg-white text-diaBlue rounded-full self-center m-1 p-0.5 h-7 w-7" />
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
                  setData({ ...data, glucose: event.target.value });
                }}
              />
            </div>

            {/* bolus */}
            <div className="p-2.5 bg-diaOrange rounded-xl shadow-md">
              <div className="flex">
                <Icon icon="fluent:syringe-20-regular" className="bg-white text-diaOrange rounded-full self-center m-1 p-0.5 h-7 w-7" />
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
                  setData({ ...data, fastActingInsulinUnits: event.target.value });
                }}
              />
            </div>
          </div>

          {/* basal */}
          {/* <TextField
            className="w-full my-5"
            id="outlined-number"
            label="basal"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setData({ ...data, basal: event.target.value });
            }}
          /> */}
          {/* carbs */}
          <TextField
            className="w-full my-5"
            id="outlined-number"
            label="carbs"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setData({ ...data, carbs: event.target.value });
            }}
          />
          {/* protein */}
          <TextField
            className="w-full my-5"
            id="outlined-number"
            label="protein"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setData({ ...data, protein: event.target.value });
            }}
          />
          {/* fats */}
          <TextField
            className="w-full my-5"
            id="outlined-number"
            label="fats"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setData({ ...data, fats: event.target.value });
            }}
          />
          {/* kcal */}
          {/* <TextField
            className="w-full my-5"
            id="outlined-number"
            label="kcal"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setData({ ...data, kcal: event.target.value });
            }}
          /> */}
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
            onClick={() => {
              setDateOpen(false);
              console.log(data);
              axios
                .post("/api", data, {
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                })
                .then((log) => console.log("log posted succefully"));
            }}
            variant="filled"
            className="flex justify-center px-2 mx-4 font-rubik text-white bg-diaGreen hover:bg-opacity-75 rounded-lg shadow-md"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
