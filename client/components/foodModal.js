import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Input, TextField } from "@mui/material";
import Image from "next/image";
import useLocalStorage from "../customeHooks/useLocalStorage";
import { useAddFood } from "../customeHooks/useAddFood";
import { formatQty } from "../utils/utils";
import InputAdornment from "@mui/material/InputAdornment";

const FoodModal = ({ props }) => {
  const { addFood } = useAddFood();
  const [qty, setQty] = useState(formatQty(props.quantity));
  //
  return (
    <div className="grid grid-cols-10 items-center gap-3 m-2 px-2 py-2 rounded-xl bg-diaDarkBlue">
      <div className="relative col-span-2 rounded-lg bg-slate-200 h-16 w-16">
        <Image src={props.image_url || "/diabuddies_logo_D_placeholder.png"} alt={props.product_name} style={{ objectFit: "cover" }} fill sizes="(max-width: 20px), (max-width: 30px)" className="rounded-lg" />
      </div>
      <div className="grid col-span-5">
        <h2 className="font-sourceCode text-lg font-semibold text-white truncate">{props.product_name}</h2>
        <p className="font-rubik text-diaBlue font-semibold text-sm truncate">{`${props.nutriments.energy_100g}Kcal, ${props.nutriments.carbohydrates_100g}g carbs per 100${props.quantity?.match(/[a-zA-Z]+/g) || "g"}`}</p>
        {props.quantity && <p className="font-poppins text-gray-400 text-sm truncate">{`${props.quantity}`}</p>}{" "}
      </div>
      <div className="col-span-3 grid grid-cols-6 px-2 text-white rounded-2xl bg-diaBlue">
        <TextField
          id="outlined-number"
          type="tel"
          variant="standard"
          placeholder="100"
          value={qty}
          className="col-span-4 self-center"
          sx={{
            marginTop: "4px",
            marginX: 1,
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
                    fontSize: 16,
                    color: "white",
                  },
                }}
              >
                {`${props.quantity?.match(/[a-zA-Z]+/g) || "g"} `}
              </InputAdornment>
            ),
            style: {
              color: "white",
            },
          }}
          onChange={(e) => {
            setQty(e.target.value);
          }}
        />
        <Button
          className="grid col-span-2 justify-items-center mx-1"
          sx={{ minWidth: "30px" }}
          onClick={() => {
            addFood({ ...props, id: crypto.randomUUID(), qty });
          }}
        >
          <Icon icon="material-symbols:add-circle-rounded" className="self-center h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default FoodModal;
