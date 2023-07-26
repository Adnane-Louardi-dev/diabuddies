import {Alert, Snackbar} from "@mui/material";
import React, {useMemo, useState} from "react";


export const useNotificatoin = ({successMessage, errorMessage, isError}) => {
    const [notificationOpen, setNotificationOpen] = useState(false);

    const handleClose = () => {
        setNotificationOpen(false)
    }
    const handleOpen = () => {
        setNotificationOpen(true)
    }
    const component = useMemo(()=>{
        return <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={isError ? "danger" : "success"} sx={{width: '100%'}}>
                {isError ? errorMessage : successMessage}
            </Alert>
        </Snackbar>
    },[successMessage, errorMessage,isError,notificationOpen])

    return {handleOpen, component}


}