import React, {useState} from "react";
import { Icon } from "@iconify/react";
import {Button, Input, TextField} from "@mui/material";
import Image from "next/image";
import useLocalStorage from "../customeHooks/useLocalStorage";
import {useAddFood} from "../customeHooks/useAddFood";
import {formatQty} from "../utils/utils";
import InputAdornment from "@mui/material/InputAdornment";



const FoodModal = ({ props }) => {
  const {addFood} = useAddFood();
  const [qty ,setQty] = useState(formatQty(props.quantity));
  //
  return (
    <div className="grid grid-cols-6 m-2 p-1 rounded-xl bg-diaDarkBlue">
      <div className="relative col-span-1 m-2 rounded-lg bg-slate-200 h-16 w-16">
        <Image src={props.image_url || "/diabuddies_logo_D_placeholder.png"} alt={props.product_name} style={{ objectFit: "cover" }} fill sizes="(max-width: 20px), (max-width: 30px)" className="rounded-lg" />
      </div>
      <div className="grid col-span-3 mx-1">
        <h2 className="font-sourceCode text-lg font-semibold text-white">{props.product_name}</h2>
        <p className="font-rubik text-diaBlue font-semibold text-sm">{`${props.nutriments.energy_100g}Kcal, ${props.nutriments.carbohydrates_100g}g carbs per 100g`}</p>
        <p className="font-poppins text-gray-400 text-sm">{`${props.quantity}`}</p>
      </div>
      <div className="flex justify-between align-middle text-white mt-4 min-w-[140px] rounded-full bg-diaBlue h-10">
          <TextField
              id="outlined-number"
              type="tel"
              variant="standard"
              placeholder="100"
              value={qty}
              sx={{
                  marginTop: "4px",
                  marginX: 1,
                  textAlign: "center",
                  border: "none",
                  "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
                      display: "none",
                  },
                  "& .MuiInputBase-input": {
                      fontSize: 16,
                      fontStyle: "bold",
                  },
              }}
              InputProps={{
                  endAdornment: (
                      <InputAdornment
                          position="end"
                          sx={{
                              "& .MuiTypography-root": {
                                  color: "white",
                                  fontSize: 16,
                              },
                          }}
                      >
                          g
                      </InputAdornment>
                  ),
                  style: {
                      color: "white",
                  },
              }}
              onChange={(e)=>{
                  setQty(e.target.value)
              }}
          />
        <Button className="grid items-center justify-items-center"
            onClick={()=>{
                addFood({...props, id: crypto.randomUUID(), qty})
            }}>
          <Icon icon="material-symbols:add-circle-rounded" className="self-center h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default FoodModal;
