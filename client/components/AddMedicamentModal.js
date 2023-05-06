import React, {useState} from "react"
import {Autocomplete, Button, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {Controller, useForm} from "react-hook-form";
import {actingTimes, colors, fakeDataProducts} from "../utils/utils";
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
    pt: 2,
    px: 4,
    pb: 3,
};

export const AddMedicamentModal = () => {
    const [open, setOpen] = useState(false)
    const {control, handleSubmit} = useForm()

    const addNewMedical = (data) => {
        axios.post("/api/settings/addMedicament", {...data, brand: data.id, }).then(res => {
            console.log("new medical was added successfily")
        })
        console.log(data)
    }

    return <>
            <Button className={"bg-diaBlue text-white"} onClick={()=>{
                setOpen(true)
            }}>New add</Button>
            <Modal
                open={open}
                onClose={()=> setOpen(false)}>
                <form onSubmit={handleSubmit(addNewMedical)}>
                    <Box sx={{...style, width: 400 }}>
                        <h2>Add New Medicament Modal</h2>
                        <section className={"mt-5"}>
                            <div>
                                <Controller
                                    name={"brand"}
                                    control={control}
                                    render={({field:{ref, onChange, ...field}})=> (
                                        <Autocomplete
                                            options={fakeDataProducts}
                                            getOptionLabel={(label) => label.name}
                                            onChange={(_,data) => onChange(data)}
                                            renderInput={(params)=>
                                                <TextField {...field} {...params} label={"Brand"}/>}
                                        />
                                    )}
                                />
                            </div>
                            <div className={"my-5 flex justify-between"}>
                                <label>Acting time</label>
                                <Controller
                                    name={"actingTime"}
                                    control={control}
                                    defaultValue={actingTimes[0]}
                                    render={({field:{ref, onChange, ...field}})=> (
                                        <Select {...field}>
                                            {actingTimes.map((type) => <MenuItem key={"actingTime"+type} value={type}>{type}</MenuItem> )}
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className={"flex"}>
                                {colors.map((color,i) => (
                                        <div key={`color`} className={`mr-2 w-8 h-8 rounded-full bg`} />
                                ))}
                            </div>
                        </section>
                        <div className={"mt-5 flex justify-between"}>
                            <Button className={""} onClick={()=> setOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit(addNewMedical)} className={"bg-diaBlue text-white"}>
                                Add
                            </Button>
                        </div>
                    </Box>
                </form>
            </Modal>
        </>
}