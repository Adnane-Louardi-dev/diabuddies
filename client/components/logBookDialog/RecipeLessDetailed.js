import React, {useMemo, useState} from "react";
import { Icon } from "@iconify/react";
import { Button, Input, TextField } from "@mui/material";
import {RenderStrapiImage} from "../gamifiy/renderStrapiImage";
import {useRouter} from "next/router";
import {useGetCurrentUserDetailed} from "../../customeHooks/useGetCurrentUser";
import CalculatingBolus from "../../utils/calculateBolus";
import {useAddFood} from "../../customeHooks/useAddFood";

const RecipeLessDetailed = ({recipe}) => {
    const router = useRouter()
    const {addFood} = useAddFood()
    const {serves, kcal, carbs, fat, protein, image, name, recipe_categories} = recipe.attributes;
    const {user, isLoading, isError} = useGetCurrentUserDetailed()
    const bolus = useMemo(()=>{
        if(!isLoading && !isError){
            return CalculatingBolus(carbs, user.diabeticDetails.carbsRatio, user.diabeticDetails.insulinSensitivity.value, 0);
        }
    },[kcal, carbs, isLoading,isError])

    return (
    <div className="flex items-center gap-1 m-2 px-2 py-2 rounded-xl bg-diaDarkBlue">
      <div className="relative col-span-2 flex-none rounded-lg bg-white h-16 w-16">
          <RenderStrapiImage image={image} />
      </div>
      <div className="grid col-span-5 flex-1">
        <h2 className="font-sourceCode text-lg font-semibold text-white truncate">{name}</h2>
        <p className="font-rubik text-diaBlue font-semibold text-sm truncate">{`${kcal}Kcal, ${carbs}g carbs, ${bolus}UI`}</p>
        <p className="font-poppins text-gray-400 text-sm truncate">Serves: {serves}</p>
      </div>
      <div className="text-white rounded-2xl bg-diaBlue">
        <Button
          className="grid mx-1"
          sx={{ minWidth: "30px" }}
          onClick={() => {
              // await router.push("/app/add")
              // await router.push({query: {
              //         log: JSON.stringify({kcal,carbs,protein,fat,bolus})
              //     }})
            addFood({
                newItem: recipe,
                itemType: "recipes",
                primaryKey: "id"
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

export default RecipeLessDetailed;
