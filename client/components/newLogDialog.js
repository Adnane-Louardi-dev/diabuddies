import * as React from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function NewLogDialog() {
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(moment());

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Button
        variant="filled"
        onClick={handleClickOpen}
        className="flex justify-between items-center text-diaBlue bg-diaBlue bg-opacity-25 pt-2 rounded-full shadow-md"
      >
        Add
        <Icon icon="material-symbols:add-circle-rounded" className="mx-1 mb-0.5" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="border-b-2 mb-5">Add new log </DialogTitle>
        <DialogContent>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
              console.log(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="font-rubik text-diaGray">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            variant="filled"
            className="flex justify-center px-2 mx-4 font-rubik text-white bg-diaGreen bg-opacity-75 rounded-lg shadow-md"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
