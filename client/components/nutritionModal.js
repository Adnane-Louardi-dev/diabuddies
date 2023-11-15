import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Input, TextField } from "@mui/material";
import Image from "next/image";
import useLocalStorage from "../customeHooks/useLocalStorage";
import { useAddFood } from "../customeHooks/useAddFood";
import { formatQty } from "../utils/utils";
import InputAdornment from "@mui/material/InputAdornment";

const NutritionModal = ({ nutrition }) => {
  const { addFood, foods, notification } = useAddFood();
  const [qty, setQty] = useState(nutrition.serving_size_g);
  //
  return (
    <div className="flex items-center gap-1 m-2 px-2 py-2 rounded-xl bg-diaDarkBlue">
        {notification}
      <div className="grid col-span-5 flex-1">
        <h2 className="font-sourceCode text-lg font-semibold text-white truncate">{nutrition.name}</h2>
        <p className="font-rubik text-diaBlue font-semibold text-sm truncate">{`${nutrition.calories}Kcal, ${nutrition.carbohydrates_total_g}g carbs per ${nutrition.serving_size_g}g`}</p>
        <p className="font-poppins text-gray-400 text-sm truncate">Fiber: {`${nutrition.fiber_g}g`}</p>
        <p className="font-poppins text-gray-400 text-sm truncate">Sugar: {`${nutrition.sugar_g}g`}</p>
      </div>
      <div className="flex w-28 flex-none text-white rounded-2xl bg-diaBlue">
        <TextField
          id="outlined-number"
          type="number"
          variant="standard"
          placeholder="0"
          value={qty ?? "100"}
          sx={{
            marginTop: "4px",
            marginX: "2px",
            border: "none",
            "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
              display: "none",
            },
            "& .MuiInputBase-input": {
              fontSize: 16,
              fontStyle: "bold",
              textAlign: "center",
              border: "1px solidblack",
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
                    width: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                {nutrition.serving_size_g ? "g" : ""}
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
          className="grid mx-1"
          sx={{ minWidth: "30px" }}
          onClick={() => {
              addFood({
                  newItem: { ...nutrition, qty},
                  itemType: "nutritions",
                  primaryKey: "name"
              });
              console.log("added");
          }}
        >
          <Icon icon="material-symbols:add-circle-rounded" className="self-center h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default NutritionModal;
