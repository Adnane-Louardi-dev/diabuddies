import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { avatars } from "../utils/avatars";
import { Avatar } from "@mui/material";
import { Icon } from "@iconify/react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import { useRouter } from "next/router";
export default function FormDialog({ user }) {
  const [avatarSrc, setAvatarSrc] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleAvatarChange = (event, newAlignment) => {
    if (newAlignment != null) {
      setAvatarSrc(newAlignment);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(process.env.FRONTEND_URL);
  };
  const handleUpdateAvatar = () => {
    setOpen(false);
    axios
      .post(
        "/api/user/",
        {
          ...user,
          ...{ photo: `${avatarSrc}` },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((data) => console.log(data));
  };

  return (
    <>
      <Button variant="outlined" className="absolute rounded-full top-48 ml-16" sx={{ minWidth: 16 }} onClick={handleClickOpen}>
        <Icon icon="material-symbols:edit" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">Choose your avatar</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>choose an avatar for your diabetes</DialogContentText> */}
          <ToggleButtonGroup
            className="grid grid-cols-2 gap-5 justify-center justify-items-center"
            sx={{
              "& .MuiToggleButtonGroup-root , .MuiButtonBase-root": {
                border: "none",
                marginX: 1,
              },
              "& .MuiToggleButtonGroup-grouped:not(:last-of-type),.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                borderRadius: "15px 15px 15px 15px",
              },
            }}
            color="primary"
            value={avatarSrc}
            exclusive
            onChange={handleAvatarChange}
            aria-label="Platform"
            variant="standart"
          >
            {avatars.map((avatar, i) => {
              return (
                <ToggleButton value={avatar.src} key={i}>
                  <Avatar alt={avatar.name} src={avatar.src} className="" sx={{ width: 80, height: 80 }} />
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateAvatar}>update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
