import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";

export default function NewLogDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="filled" onClick={handleClickOpen} className="text-diaBlue rounded-full">
        <Icon icon="material-symbols:add" className="h-6 w-6" />
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="font-rubik text-diaGray">
            Cancel
          </Button>
          <Button onClick={handleClose} className="flex justify-between px-2 mx-4 font-rubik text-white bg-diaBlue rounded-lg shadow-md">
            <SaveIcon className="mr-2" />
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
