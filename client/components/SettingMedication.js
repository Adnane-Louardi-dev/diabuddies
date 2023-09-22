import React from "react"
import {Autocomplete, Button, TextField} from "@mui/material";
import {Icon} from "@iconify/react";
import Select from "@mui/material/Select";
import {Controller} from "react-hook-form";
import {actingTimes, colors, fakeDataProducts} from "../utils/utils";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import axios from "axios";


export const SettingMedication = ({medication,setMedicament,refetch}) => {
  const deleteMedication = () => {
      axios.delete(`/api/user/medicament/${medication._id}`).then(refetch)
  }
  return <section className={`relative pb-4 block md:flex gap-2 justify-between align-middle flex-wrap border-b-2 border-solid`}>
      <div className={"mt-2"}>
          <label className={"text-diaBlue mr-5"}>Brand:</label>
          <span>{medication.brand?.name}</span>
      </div>
      <div className={"mt-2"}>
          <label className={"text-diaBlue mr-5"}>Acting time:</label>
          <span>{medication.actingTime}</span>
      </div>
      <div className={"flex justify-between mt-2 w-[200px]"}>
          {colors.map((color,i) => (
              color !== medication.color ?
                  <div key={`color-${color}`} className={`w-8 h-8 rounded-full bg-${color}`} /> :
                  <Icon key={`color-${color}`}  className={`w-8 h-8 p-1 rounded-full bg-${color} text-white`} icon="material-symbols:done" />
          ))}
      </div>
      <div>
          <IconButton className={"w-8 h-8 absolute top-5 right-10 md:relative md:top-auto md:right-auto"} onClick={()=> setMedicament(medication)}>
              <Icon icon="solar:pen-2-linear" />
          </IconButton>
          <IconButton className={"w-8 h-8 absolute top-5 right-0 md:relative md:top-auto md:right-auto"} onClick={deleteMedication}>
              <Icon icon="mdi:remove" className={"text-red-500"} />
          </IconButton>
      </div>
  </section>
}