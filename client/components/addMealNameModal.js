import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Modal} from "@mui/material";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AddMealNameModal = ({mealModalOpen,setMealModalOpen, data,onSave}) => {
    const [mealName, setMealName] = useState("")
    const {mutate:saveAsAMeal} = useMutation(()=>{
        onSave()
        return axios.post("/api/logbook/meal", {...data,mealName})
    })
    return <Modal
        open={mealModalOpen}
        onClose={() => setMealModalOpen(false)}
        aria-labelledby="meal-modal"
        aria-describedby="meal-modal-creation"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add a name for this meal
            </Typography>
            <br/>
            <TextField placeholder={"Meal Name"}
                       className={"w-full"}
                       value={mealName}
                       onChange={(e)=>{
                           setMealName(e.target.value)
                       }} />
            <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", width: "full", marginTop: "20px" }}>
                <Button
                    onClick={() => setMealModalOpen(false)}
                    className="w-full p-3 rounded-full shadow-md text-gray-800 font-codeSource font-xl"
                >
                    Cancel
                </Button>
                <Button onClick={()=>{
                    saveAsAMeal()
                    setMealModalOpen(false)
                }} variant="filled" className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white  font-codeSource font-xl">
                    Save
                </Button>
            </Box>
        </Box>
    </Modal>
}