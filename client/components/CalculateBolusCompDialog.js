import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, Snackbar, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import {useTranslation} from "next-i18next";
import {useGetCurrentUserDetailed} from "../customeHooks/useGetCurrentUser";
import React, {useState} from "react";
import axios from "axios";
import {useProfile} from "../customeHooks/useProfile";


export default function EditFactorsDialog() {
    const {user} = useGetCurrentUserDetailed();
    const [notificationOpen, setNotificationOpen] = useState(false);
    const {t, i18n} = useTranslation("index");
    const [open, setOpen] = useState(false);
    const {mutate: updateUser, isError, isLoading: updateUserLoading} = useProfile(setNotificationOpen);
    const [data, setData] = useState({
        insulinSensitivity: {value: null, unit: user.diabeticDetails.insulinSensitivity.unit}, carbsRatio: null
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNotificationOpen(false);
    };
    const handleUpdateNewFactors = async () => {
        await updateUser({
            ...user,...data
        });
        return handleClose()
    };

    return (<>
        <Snackbar open={notificationOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={isError ? "warning" : "success"} sx={{ width: "100%" }}>
                {isError ? "There was an error while modifying your factors" : "Your factors was modified successfully"}
            </Alert>
        </Snackbar>
        <Button variant="text" onClick={handleClickOpen} sx={{textTransform: "capitalize", color: "#1e293b"}}>
            <Typography textAlign="center">Edit Factors</Typography>
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <div className={"flex gap-2"}>
                    <div className="grid gap-2 rounded-lg shadow-md w-full p-3 mx-1 text-white bg-diaDarkBlue">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Icon icon="fluent:ratio-one-to-one-24-regular" className="h-7 w-7"/>
                                <p className="mx-1 font-rubik text-sm">{t("carbsRatio")} </p>
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
                                className="w-10 font-sourceCode font-semibold text-3xl text-center"
                                placeholder={"00"}
                                defaultValue={user.diabeticDetails.carbsRatio}
                                onChange={(newCarbsRatio) => setData({
                                    ...data, carbsRatio: parseFloat(newCarbsRatio.target.value)
                                })}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontSize: 20, fontStyle: "bold", textAlign: "center", color: "white"
                                    },
                                }}
                            />
                            <span className="text-sm">(g) per UI</span>
                        </div>
                    </div>
                    <div className="grid gap-2 rounded-lg shadow-md w-full p-3 mx-1 text-white bg-diaDarkBlue">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Icon icon="mdi:feather" className="h-7 w-7"/>
                                <p className="mx-1 font-rubik text-sm">{t("insulinSensitivity")}</p>
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
                                className="w-10 font-sourceCode font-semibold text-3xl text-center"
                                placeholder={"00"}
                                defaultValue={user.diabeticDetails.insulinSensitivity.value}
                                onChange={(newInsulinSensitivity) => setData({
                                    ...data,
                                    insulinSensitivity: {
                                        ...data.insulinSensitivity,
                                        value: parseFloat(newInsulinSensitivity.target.value)
                                    }
                                })}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontSize: 20, fontStyle: "bold", textAlign: "center", color: "white"
                                    },
                                }}
                            />
                            <span className="text-sm">{user.diabeticDetails.insulinSensitivity.unit}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateNewFactors}
                        className={"w-full rounded-full bg-diaDarkBlue text-white capitalize"}>Save New
                    Factors</Button>
            </DialogActions>
        </Dialog>
    </>);
}
