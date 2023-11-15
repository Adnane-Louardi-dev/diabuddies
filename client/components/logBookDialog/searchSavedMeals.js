import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Modal, Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "../loadingCircle";
import { Breakfast, Dinner, Glucose, Lunch, Snack } from "../mealIcons";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import {useAddFood} from "../../customeHooks/useAddFood";
import Container from "@mui/material/Container";
import {useRouter} from "next/router";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SearchSavedMeals = ({handleClose}) => {
  const {add, notification} = useAddFood()
  const router = useRouter()
  const { data: savedMeals, isLoading } = useQuery(["savedMeals"], () => {
    return axios
      .get("/api/logbook/meals")
      .then((res) => res.data)
      .catch(() => []);
  });

  const getMealIcon = React.useCallback((mealTime) => {
    if (mealTime) {
      switch (mealTime) {
        case "breakfast":
          return <Breakfast />;
        case "lunch":
          return <Lunch />;
        case "dinner":
          return <Dinner />;
        case "snack":
          return <Snack />;
        default:
          return <Glucose />;
      }
    }
    return <Glucose />;
  }, []);
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <Container maxWidth={"xl"}>
      {notification}
      {savedMeals.map(({ whenEated, mealName, foods, kcal, carbs, protein, fat, bolus }, i) => (
        <div key={i}
          className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer"
        >
          <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">{getMealIcon(whenEated)}</div>
          <div className="grid gap-2 col-span-5">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{mealName}</h4>
                <ul>
                  {foods.nutritions.map(nutrition => (
                    <li key={nutrition}>{nutrition}</li>
                  ))}
                  {foods.products.map(product => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center p-1 text-white rounded-lg bg-diaDarkBlue">
                  <Icon icon="fluent:food-grains-20-regular" className="mx-1" />
                  <span className="font-sourceCode text-xs">Carbs</span>
                  <span className="font-sourceCode font-bold mx-2">{`${carbs} g`}</span>
                </div>
                <IconButton
                    className="grid mx-1"
                    sx={{ minWidth: "30px" }}
                    onClick={async () => {
                      await router.push("/app/add")
                      await router.push({query: {
                          log: JSON.stringify({
                            kcal,
                            carbs,
                            protein,
                            fat,
                            bolus
                          })
                        }})
                      handleClose()
                    }}
                >
                  <Icon icon="material-symbols:add-circle-rounded" className="self-center h-7 w-7 text-diaDarkBlue" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};
