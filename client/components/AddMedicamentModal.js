import React, {useState} from "react";
import {Autocomplete, Button, Input, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {Controller, useForm} from "react-hook-form";
import {actingTimes, colors, fakeDataProducts} from "../utils/utils";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {useTranslation} from "next-i18next";
import {Icon} from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import {nullMedication} from "../utils/nulls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const AddMedicamentModal = ({medications,medication,setModalMedication,refetch}) => {
    const {control, handleSubmit} = useForm();
    const {t} = useTranslation()
    const [colorSelected, setColorSelected] = useState(medication?.color);
    const createNew =  medication?._id === undefined;
    const {mutate:addNewMedicalMutation} = useMutation({
        mutationFn: (medicament) => (axios.post("/api/user/medicament", medicament)),
        onSuccess: () => {
            console.log("new medical was added successfily")
            refetch()
        },
        onError: () => {
            //TODO error toast
        }
    })
    const {mutate:modifyMedicament} = useMutation({
        mutationFn: (medicament) => (axios.put("/api/user/medicament", medicament)),
        onSuccess: () => {
            console.log("new medical was mofied successfily")
            refetch()
        },
        onError: () => {
            //TODO error toast
        }
    })
    const addEditNewMedical = (data) => {
        if(createNew){
            addNewMedicalMutation({...data, brand: data.brand._id, color: colorSelected})
        } else {
            modifyMedicament({...data,id:medication._id, brand: data.brand._id, color: colorSelected})
        }
        setModalMedication(undefined)
    };

    return (
        <>
        <Button
            className={"bg-diaBlue text-white"}
            onClick={() => {
                setModalMedication(nullMedication);
            }}>
            {t("add")}
        </Button>
      <Modal open={medication !== undefined} onClose={()=>setModalMedication(undefined)}>
        <form onSubmit={handleSubmit(addEditNewMedical)}>
          <Box sx={{ ...style, width: 400 }}>
            <h2>{createNew ? t("addMedicament"): t("Modify medicament")}</h2>
            <section className={"mt-5"}>
              <div>
                <Controller
                  name={"brand"}
                  control={control}
                  defaultValue={medication?.brand}
                  render={({ field: { ref, onChange, ...field } }) => (
                    <Autocomplete
                      options={medications}
                      getOptionLabel={(label) => label.name}
                      onChange={(_, data) => onChange(data)}
                      renderInput={(params) => <TextField {...field} {...params} label={"Brand"} />}
                    />
                  )}
                />
              </div>
              <div className={"my-5"}>
                <Controller
                  name={"actingTime"}
                  control={control}
                  defaultValue={medication?.actingTime}
                  render={({ field: { ref, onChange, ...field } }) => (
                    <Select {...field} onChange={onChange} className={"w-full"}>
                      {actingTimes.map((type) => (
                        <MenuItem key={"actingTime" + type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className={"flex"}>
                {colors.map((color, i) => (
                    <IconButton key={`color-${color}`} onClick={()=>setColorSelected(color)}>
                        {color !== colorSelected ?
                            <div className={`w-8 h-8 rounded-full bg-${color}`}/> :
                            <Icon className={`w-8 h-8 p-1 rounded-full bg-${color} text-white`}
                                  icon="material-symbols:done"/>}
                    </IconButton>
                ))}
              </div>
            </section>
            <div className={"mt-5 flex justify-between"}>
              <Button onClick={() => setModalMedication(undefined)}>
                  {t("cancel")}
              </Button>
              <Button onClick={handleSubmit(addEditNewMedical)} className={"bg-diaBlue text-white"}>
                  {createNew ? t("add") : t("edit")}
              </Button>
            </div>
          </Box>
        </form>
      </Modal>
    </>
  );
};
