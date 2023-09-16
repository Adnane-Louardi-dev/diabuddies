import React, {useState} from "react";
import axios from "axios";
import moment from "moment";
import {Breakfast, Dinner, Glucose, Lunch, Snack} from "./mealIcons";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {Alert, Snackbar} from "@mui/material";
import {Icon} from "@iconify/react";
import {useTranslation} from "next-i18next";

const LogBookItem = ({ props }) => {
  const [data, setData] = useState(props);
  const queryClient = useQueryClient();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const {t} = useTranslation("index")
  const {t:tc} = useTranslation()
  const {
    mutate: deleteLog,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["deleteLog"],
    mutationFn: (data) => {
      return axios.delete(`/api/logbook/?id=${data._id}`, data, {
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

  const handleClose = () => {
    setNotificationOpen(false);
  };

  const getMealIcon = React.useCallback((mealTime) =>{
    const mealTimes = {
      "breakfast": <Breakfast/>,
      "lunch": <Lunch/>,
      "dinner": <Dinner/>,
      "snack": <Snack/>,
    }
    if(mealTime) {
      return mealTimes[mealTime] ?? <Glucose />
    }
    return <Glucose />
  },[])

  return (
    <>
      {isLoading && <Box sx={{display: "flex"}}>
        <CircularProgress/>
      </Box>}
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={isError ? "danger" : "warning"} sx={{ width: "100%" }}>
          {isError ? "There was an error while deleting log book" : "Log book was deleted successfully"}
        </Alert>
      </Snackbar>

      <div className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white">
        <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
          {getMealIcon(data.meal)}
        </div>
        <div className="grid gap-2 col-span-5">
          <div className="flex justify-between items-center">
            <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{t(data.meal+"_meal")}</h4>
            <div className="flex items-center justify-center">
              <span className="mr-1 p-0.5 h-6 w-6 rounded-lg">
                <Icon icon="tabler:clock" className="h-5 w-5 text-diaDarkBlue" />
              </span>
              <span className="font-rubik text-sm">{`${moment(data.time).format("HH:mm")}`}</span>
            </div>
          </div>
          {data.glucose && (
            <div className="flex items-center justify-between">
              <div className={`flex items-center justify-center mr-3 p-1 text-white rounded-lg bg-${data.glucose >= 180 ? "diaRed" : data.glucose <= 70 ? "diaBlue" : "diaGreen"}`}>
                <Icon icon="ph:drop" className="mx-1" />
                <span className="font-sourceCode">{`${data.glucose} ${tc("mg/dL")}`}</span>
              </div>
              <span className="text-diaGray font-rubik font-semibold text-xs">{tc("range")}: 70-180 mg/dL</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            {data.carbs !==0 && (
              <div className="flex items-center justify-center p-1 text-white rounded-lg bg-diaDarkBlue">
                <Icon icon="fluent:food-grains-20-regular" className="mx-1" />
                <span className="font-sourceCode text-xs">{tc("carbs")}</span>
                <span className="font-sourceCode font-bold mx-2">{`${data.carbs} ${tc("g")}`}</span>
              </div>
            )}
            {data.bolus && (
              <div className="flex items-center justify-center p-1 text-white rounded-lg bg-diaOrange">
                <Icon icon="fluent:food-grains-20-regular" className="mx-1" />
                <span className="font-sourceCode text-xs">{tc("bolus")}</span>
                <span className="font-sourceCode font-bold mx-2">{`${data.bolus} UI`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogBookItem;
