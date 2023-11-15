import useLocalStorage from "../customeHooks/useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNotificatoin } from "./useNotificatoin";
import {isAllEntriesAreNull, renderNumber} from "../utils/utils";
import { useState } from "react";

function removeDuplicates(foods,key) {
    const uniqueFood = [];
    const seenFood = new Set();

    for (const food of foods) {
        const foodKey = food[key];

        if (!seenFood.has(foodKey)) {
            seenFood.add(foodKey);
            uniqueFood.push(food);
        }
    }

    return uniqueFood;
}
function getItemName(item, itemType){
    if(itemType === "recipes"){
        return item.attributes.name
    }else if(itemType === "products"){
        return item.product_name
    }else if(itemType === "nutritions"){
        return item.name
    }
    return "this item "
}
export const useAddFood = () => {
  const [successMessage, setSuccessMessage] = useState("was Added Successfully")
  const [errorMessage, setErrorMessage] = useState("error occured, try to add it again")

  const { data: foods, refetch } = useQuery(["recent-food"], () => {
    const products = JSON.parse(localStorage.getItem("recent-products")) || [];
    const recipes = JSON.parse(localStorage.getItem("recent-recipes")) || [];
    const nutritions = JSON.parse(localStorage.getItem("recent-nutritions")) || [];
    return {products, recipes, nutritions};
  });
  const { mutate: addFood, isError } = useMutation(
    ({newItem, itemType, primaryKey}) => {
      const recentKey = "recent-"+itemType;
      const allKey = "all-"+itemType;
      const recentItems = JSON.parse(localStorage.getItem(recentKey)) ||  [];
      const allItems = JSON.parse(localStorage.getItem(allKey)) ||  {[itemType]: []};
      const addedItemExists = recentItems.find((item) => item[primaryKey] === newItem[primaryKey]);
      if (addedItemExists) {
          addedItemExists.qty += renderNumber(newItem.qty);
          if(itemType === "recipes"){
              addedItemExists.units += 1;
          }
          localStorage.setItem(recentKey, JSON.stringify([...foods[itemType].filter((food) => food[primaryKey] !== newItem[primaryKey]), addedItemExists]));
      } else {
          if(itemType === "recipes"){
              newItem.units = 1
          }
          localStorage.setItem(recentKey, JSON.stringify([...foods[itemType], {...newItem, qty: renderNumber(newItem.qty)}]));
      }
      localStorage.setItem(allKey, JSON.stringify({ [itemType]: removeDuplicates([...allItems[itemType], newItem], primaryKey) }));
    },
    {
      onSuccess: (_, variables) => {
          setSuccessMessage(getItemName(variables.newItem, variables.itemType) + " was added successfully")
          handleOpen()
          refetch()
      },
      onError: (_, variables) => {
          setErrorMessage("error occured adding, "+ getItemName(variables.newItem, variables.itemType) + ", try to add it again")
          handleOpen()
      }
    }
  );
  const { mutate: removeFood } = useMutation(
    ({primaryKey, itemType, primaryKeyValue}) => {
      localStorage.setItem(`recent-${itemType}`, JSON.stringify(foods[itemType].filter((food) => food[primaryKey] !== primaryKeyValue)));
    },
    {
      onSuccess: refetch,
    }
  );
  const { mutate: clearAll } = useMutation(
    () => {
      localStorage.setItem("recent-products", JSON.stringify([]));
      localStorage.setItem("recent-recipes", JSON.stringify([]));
      localStorage.setItem("recent-nutritions", JSON.stringify([]));
    },
    {
      onSuccess: refetch,
    }
  );
  const {component:notification, handleOpen} = useNotificatoin({
    successMessage,
    errorMessage,
    isError
  })
  return { foods, addFood, removeFood, clearAll, notification };
};

export const useAddNewLogBook = () => {
  const queryClient = useQueryClient();
  const initialMessage = "There was an error while saving log book";
  const [errorMessage, setErrorMessage] = useState(initialMessage);
  const result = useMutation({
    mutationKey: ["addNewLogBook"],
    mutationFn: (data) => {
      return new Promise((resolve, reject) => {
        if (
          isAllEntriesAreNull({
            carbs: data.carbs,
            glucose: data.glucose,
            bolus: data.bolus,
            basal: data.basal,
            protein: data.protein,
            fat: data.fat,
          })
        ) {
          setErrorMessage("please fill at least one of the inputs");
          return reject("all values are null");
        }
        console.log("log book data", data)
        return axios
          .post("/api/logbook", data, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(resolve)
          .catch((err) => {
            console.log(err);
            setErrorMessage(err);
            reject(err);
          });
      });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries(["indexChart"])
      const prevIndexChart = queryClient.getQueryData(["indexChart"])
      const logBooks = data._id ?
          [...prevIndexChart.logBooks.filter(log => log._id !== data._id), data] :
          [...prevIndexChart.logBooks, data]
      const newIndexChart = { logBooks }
      queryClient.setQueryData(["indexChart"], newIndexChart)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["indexChart"]);
      queryClient.invalidateQueries(["gamify"]);
    },
    onSettled: () => {
      handleOpen();
    },
  });
  const { component, handleOpen } = useNotificatoin({
    successMessage: "Log book was added successfully",
    errorMessage,
    isError: result.isError,
  });

  return { ...result, notification: component };
};



export const addRecipeAsLog = async (router, log) => {
  await router.push("/app/add")
  await router.push({query: {
      log: JSON.stringify(log)
    }})
}