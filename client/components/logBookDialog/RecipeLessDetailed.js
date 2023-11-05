import React, {useMemo, useState} from "react";
import { Icon } from "@iconify/react";
import { Button, Input, TextField } from "@mui/material";
import {RenderStrapiImage} from "../gamifiy/renderStrapiImage";
import {useRouter} from "next/router";
import {useGetCurrentUserDetailed} from "../../customeHooks/useGetCurrentUser";
import CalculatingBolus from "../../utils/calculateBolus";
import {useAddFood} from "../../customeHooks/useAddFood";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";

const RecipeLessDetailed = ({recipe}) => {
    const router = useRouter()
    const {addFood, notification} = useAddFood()
    const {serves, kcal, carbs, fat, protein, image, name, recipe_categories} = recipe.attributes;
    const {user, isLoading, isError} = useGetCurrentUserDetailed()
    const bolus = useMemo(()=>{
        if(!isLoading && !isError){
            return CalculatingBolus(carbs, user.diabeticDetails.carbsRatio, user.diabeticDetails.insulinSensitivity.value, 0);
        }
    },[kcal, carbs, isLoading,isError])


    return (
        <div className="p-3 h-62 w-52 shrink-0 border-2 rounded-2xl shadow-md">
            {notification}
            <div className="relative h-32 border-2 rounded-xl">
                <div className="absolute right-0 p-2 z-10 cursor-pointer">
                    <IconButton className={"rounded-md bg-white text-md h-7 w-7"}
                                onClick={()=>{
                                    addFood({
                                        newItem: recipe,
                                        itemType: "recipes",
                                        primaryKey: "id"
                                    });
                                }}>
                    <Icon icon="ic:round-add"
                          className={`h-7 w-7 text-black`}/>
                    </IconButton>
                </div>
                <RenderStrapiImage image={image} />
            </div>
            <h3 className="flex justify-between font-semibold font-inter">{name}</h3>
            <p className="font-rubik text-diaBlue font-semibold text-xs truncate">{`${kcal}Kcal, ${carbs}g carbs, ${bolus}UI`}</p>
            <div className="flex mt-2">
                {recipe_categories.data.map(({attributes}) =>(
                    <div key={attributes.name} className="bg-diaLightGreen rounded-xl font-poppins text-xs py-1 px-3 mx-1 text-diaMediumGreen shadow-lg shadow-diaLightGreen/50">
                        {attributes.name}
                    </div>
                ))}
            </div>
        </div>
    )
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
