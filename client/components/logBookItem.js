import React, {useState} from "react";
import axios from "axios";
import moment from "moment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {Breakfast, Dinner, Glucose, Lunch, Snack} from "../components/mealIcons";
import {deleteLog} from "../features/dataReducers/data";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {Alert, Snackbar} from "@mui/material";

const LogBookItem = ({props}) => {
    const [data, setData] = useState(props);
    const queryClient = useQueryClient()
    const [notificationOpen, setNotificationOpen] = useState(false);

    const {mutate: deleteLog, isLoading, isError} = useMutation({
        mutationKey: ["deleteLog"],
        mutationFn: (data) => {
            return axios.delete(`/api/logbook/?id=${data._id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
        },
        onSuccess: (log) => {
            queryClient.invalidateQueries(["indexChart"])
            console.log(log)
        },
        onError: (e) => {
            console.error(e)
        },
        onSettled: () => {
            setNotificationOpen(true)
        }
    })

    const handleClose = () => {
        setNotificationOpen(false)
    }

    return (
        <Accordion
            className="my-3 px-none border-none rounded-xl"
            sx={{
                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary className="border-none rounded-xl shadow-md" expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1a-content" id="panel1a-header">
                <Box sx={{display: 'flex'}}>
                    <CircularProgress hidden={!isLoading}/>
                </Box>
                <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={isError ? "danger" : "warning"} sx={{width: '100%'}}>
                        {isError ? "There was an error while deleting log book" : "Log book was deleted successfully"}
                    </Alert>
                </Snackbar>
                <div className="self-center flex items-center mx-2 bg-diaBlue h-10 w-10 rounded-xl shadow-md">
                    {data.meal ? (
                        data.meal === "Breakfast" ? (
                            <Breakfast/>
                        ) : data.meal === "Lunch" ? (
                            <Lunch/>
                        ) : data.meal === "Dinner" ? (
                            <Dinner/>
                        ) : data.meal === "Snack" ? (
                            <Snack/>
            ) : (
              <Glucose />
            )
          ) : (
            <Other />
          )}
        </div>
        <div className="mx-2">
          <p className="font-rubik font-bold truncate overflow-hidden">{data.meal}</p>
          <p className="font-rubik text-sm text-diaGray">{`${moment(data.time).format("HH:mm")}`}</p>
        </div>
      </AccordionSummary>
      <AccordionDetails className="rounded-xl">
        <TableContainer component={Paper} className="shadow-none">
          <Table aria-label="simple table" className="border-separate border-spacing-y-3">
            <TableBody className="">
              {data.glucose ? (
                <TableRow className=" rounded-lg" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" className="border-2 border-diaBlue border-r-0 rounded-xl rounded-r-none font-poppins">
                    glucose(mg/dL)
                  </TableCell>
                  <TableCell align="right" className="border-2 border-diaBlue border-l-0 rounded-xl rounded-l-none font-inter font-semibold">
                    {data.glucose}
                  </TableCell>
                </TableRow>
              ) : null}
              {data.carbs ? (
                <TableRow className=" rounded-lg" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" className="border-2 border-diaBlue border-r-0 rounded-xl rounded-r-none font-poppins">
                    Carbohydrates(g)
                  </TableCell>
                    <TableCell align="right"
                               className="border-2 border-diaBlue border-l-0 rounded-xl rounded-l-none font-inter font-semibold">
                        {data.carbs}
                    </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
          <Button
              onClick={async () => {
                  await deleteLog(data)
              }}
              variant="filled"
              className="flex justify-center px-2 mx-4 font-rubik text-white bg-diaGray hover:bg-opacity-75 rounded-lg shadow-md"
          >
              delete
          </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default LogBookItem;
