import React from "react"
import {Autocomplete, Button, TextField} from "@mui/material";
import {Icon} from "@iconify/react";
import Select from "@mui/material/Select";
import {Controller} from "react-hook-form";
import {actingTimes, colors, fakeDataProducts} from "../utils/utils";
import MenuItem from "@mui/material/MenuItem";


export const SettingMedication = ({medication, control}) => {
  return <section>
      <div className={"flex justify-between"}>
          <span className={`text-`}>{medication.name}</span>
          <Button className={`bg-`}>
              <Icon icon="solar:pen-2-linear" />
          </Button>
      </div>
      <div>
          <label>Brand</label>
          <Controller
              name={"brand"}
              control={control}
              defaultValue={medication.brand?.name}
              render={({field:{ref, onChange, ...field}})=> (
                  <Autocomplete
                      options={fakeDataProducts}
                      getOptionLabel={(label) => label}
                      onChange={(_,data) => onChange(data)}
                      renderInput={(params)=>
                          <TextField {...field} {...params} label={"Brand"}/>}
                  />
              )}
          />
      </div>
      <div>
          <label>Acting time</label>
          <Controller
              name={"actingTime"}
              control={control}
              defaultValue={medication.actingTime}
              render={({field:{ref, onChange, ...field}})=> (
                  <Select {...field}>
                      {actingTimes.map((type) => <MenuItem key={"actingTime"+type} value={type}>{type}</MenuItem> )}
                  </Select>
              )}
          />
      </div>
      <div>
          {colors.map((color,i) => (
              color === medication.color ?
                  <div key={`color`} className={`w-20 h-20 rounded-full }`} /> :
                  <Icon className={`w-20 h-20 rounded-full `} icon="material-symbols:done" />
          ))}
      </div>

  </section>
}