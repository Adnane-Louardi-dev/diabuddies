import useLocalStorage from "../customeHooks/useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNotificatoin } from "./useNotificatoin";
import { isAllEntriesAreNull } from "../utils/utils";
import { useState } from "react";

export const useAddFood = () => {
  const { data: foods, refetch } = useQuery(["recent-food"], () => {
    const products = JSON.parse(localStorage.getItem("recent-products")) || [];
    const recipes = JSON.parse(localStorage.getItem("recent-recipes")) || [];
    return {products, recipes};
  });
  const { mutate: addFood } = useMutation(
    ({newItem, itemType, primaryKey}) => {
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
      const recentKey = "recent-"+itemType;
      const allKey = "all-"+itemType;
      const recentItems = JSON.parse(localStorage.getItem(recentKey)) ||  [];
      const allItems = JSON.parse(localStorage.getItem(allKey)) ||  {[itemType]: []};
      const addedItemExists = recentItems.find((item) => item[primaryKey] === newItem[primaryKey]);
      if (addedItemExists) {
          addedItemExists.units += 1;
          localStorage.setItem(recentKey, JSON.stringify([...foods[itemType].filter((food) => food[primaryKey] !== newItem[primaryKey]), addedItemExists]));
      } else {
          localStorage.setItem(recentKey, JSON.stringify([...foods[itemType], {...newItem, units: 1}]));
      }
      localStorage.setItem(allKey, JSON.stringify({ [itemType]: removeDuplicates([...allItems[itemType], newItem], primaryKey) }));
    },
    {
      onSuccess: refetch,
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
    },
    {
      onSuccess: refetch,
    }
  );
  return { foods, addFood, removeFood, clearAll };
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