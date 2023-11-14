import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Breakfast, Dinner, Glucose, Lunch, Snack } from "./mealIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Typography, Alert, Snackbar, Menu, MenuItem } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslation } from "next-i18next";
import {useNotificatoin} from "../customeHooks/useNotificatoin";
import {useRouter} from "next/router";

const LogBookItem = ({ log }) => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { t } = useTranslation("index");
  const { t: tc } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const {
    mutate: deleteLog,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["deleteLog"],
    mutationFn: (data) => {
      console.log("delete data",data)
      return axios.delete(`/api/logbook/?id=${data._id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    onSuccess: (log) => {
      queryClient.invalidateQueries(["indexChart"]);
    },
    onError: (e) => {
      console.error(e);
    },
    onSettled: () => {
      setNotificationOpen(true);
    },
  });

  const  {component, handleOpen } = useNotificatoin({
    successMessage: "",
    errorMessage: <div className={"flex"}>
      <p className={"font-rubik mx-1"}>Are you sure want to delete this log</p>
      <Button onClick={() => {
        deleteLog(log)
      }} className={"text-white capitalize bg-diaRed rounded-xl"}>Yes</Button>
    </div>,
    isError: true
  })

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const getMealIcon = React.useCallback((mealTime) => {
    const mealTimes = {
      breakfast: <Breakfast />,
      lunch: <Lunch />,
      dinner: <Dinner />,
      snack: <Snack />,
    };
    if (mealTime) {
      return mealTimes[mealTime] ?? <Glucose />;
    }
    return <Glucose />;
  }, []);

  return (
    <>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleNotificationClose}>
        <Alert onClose={handleNotificationClose} severity={isError ? "error" : "warning"} sx={{ width: "100%" }}>
          {isError ? "There was an error while deleting log book" : "Log book was deleted successfully"}
        </Alert>
      </Snackbar>
      {component}

      <div className="grid grid-cols-6 gap-5 p-3 mb-4 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white">
        <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">{getMealIcon(log.meal)}</div>
        <div className="grid gap-2 col-span-5">
          <div className="flex justify-between items-center">
            <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{t(log.meal + "_meal")}</h4>
            <div className="flex items-center">
              <span className="grid items-center mr-1 rounded-lg">
                <Icon icon="tabler:clock" className="h-4 w-4 text-diaGray" />
              </span>
              <span className="font-rubik text-sm">{`${moment(log.time).format("HH:mm")}`}</span>
              <button onClick={handleClick} className="flex justify-end">
                <Icon icon="pepicons-pencil:dots-y" className="h-7 w-7 text-diaDarkBlue" />
              </button>
              <Menu
                id="demo-positioned-menu"
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root.MuiMenu-paper": {
                    borderRadius: "15px",
                  },
                }}
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem className="flex" onClick={async ()=>{
                  await router.push("/app/add")
                  await router.push({query: {
                    log: JSON.stringify({
                      ...log,
                      userId: undefined,
                      __v: undefined
                    })
                    }})
                }}>
                  <Icon icon="tabler:edit" className={`h-6 w-6 text-diaGray mr-2}`} />
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem className="flex" onClick={handleOpen}>
                  <Icon icon="mdi:delete-outline" className={`h-6 w-6 text-diaGray mr-2}`} />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
              </Menu>
            </div>
          </div>
          {log.glucose ? (
            <div className="grid grid-cols-5 items-center justify-between gap-3">
              <div className={`col-span-3 flex items-center justify-center mr-3 p-1 text-white rounded-lg ${log.glucose >= 180 ? "bg-diaRed" : log.glucose <= 70 ? "bg-diaBlue" : "bg-diaGreen"}`}>
                <Icon icon="ph:drop" className="mx-1" />
                <span className="font-sourceCode truncate">{`${log.glucose} ${tc("mg/dL")}`}</span>
              </div>
              <span className="col-span-2 text-diaGray font-rubik font-semibold text-xs truncate">{tc("range")}: 70-180 mg/dL</span>
            </div>
          ) : null}
          <div className="grid grid-cols-2 items-center justify-between gap-3">
            {log.carbs !== 0 && (
              <div className="flex items-center justify-center p-1 text-white rounded-lg bg-diaDarkBlue">
                <Icon icon="fluent:food-grains-20-regular" className="mx-1" />
                <span className="font-sourceCode text-xs">{tc("carbs")}</span>
                <span className="font-sourceCode font-bold mx-2 truncate">{`${log.carbs} ${tc("g")}`}</span>
              </div>
            )}
            {log.bolus && (
              <div className="flex items-center justify-center p-1 text-white rounded-lg bg-diaOrange">
                <Icon icon="fluent:food-grains-20-regular" className="mx-1" />
                <span className="font-sourceCode text-xs">{tc("bolus")}</span>
                <span className="font-sourceCode font-bold mx-2 truncate">{`${log.bolus} UI`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogBookItem;
