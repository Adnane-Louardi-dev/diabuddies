import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import Image from "next/image";

const FoodModal = ({ props }) => {
  const addFoodToLocalStorage = async () => {
    try {
      let old_data = JSON.parse(localStorage.getItem("addedFood")) || [];
      old_data.push(props);
      localStorage.setItem("addedFood", JSON.stringify(old_data));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="grid grid-cols-6 m-2 p-1 rounded-xl bg-diaDarkBlue">
      <div className="relative col-span-1 m-2 rounded-lg bg-slate-200 h-16 w-16">
        <Image src={props.image_url || "/diabuddies_logo_D_placeholder.png"} alt={props.product_name} style={{ objectFit: "cover" }} fill sizes="(max-width: 20px), (max-width: 30px)" className="rounded-lg" />
      </div>
      <div className="grid col-span-4 mx-2">
        <h2 className="font-sourceCode text-lg font-semibold text-white">{props.product_name}</h2>
        <p className="font-rubik text-diaBlue font-semibold text-sm">{`${props.nutriments.energy_100g}Kcal, ${props.nutriments.carbohydrates_100g}g carbs per 100g`}</p>
        <p className="font-poppins text-gray-400 text-sm">{`${props.quantity}`}</p>
      </div>
      <div className="grid items-center justify-items-center col-span-1">
        <Button className="grid items-center justify-items-center rounded-full bg-diaBlue" onClick={addFoodToLocalStorage}>
          <Icon icon="material-symbols:add-circle-rounded" className="self-center h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default FoodModal;
