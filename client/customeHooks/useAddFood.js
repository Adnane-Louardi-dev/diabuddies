import useLocalStorage from "../customeHooks/useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNotificatoin } from "./useNotificatoin";
import { isAllEntriesAreNull } from "../utils/utils";
import { useState } from "react";

export const useAddFood = () => {
  const { data: foods, refetch } = useQuery(["my-food"], () => {
    const food = localStorage.getItem("my-food");
    return food ? JSON.parse(food) : [];
  });
  const { mutate: addFood } = useMutation(
    (food) => {
      function removeDuplicates(array, key) {
        const uniqueArray = [];
        const seen = new Set();

        for (const item of array) {
          const itemKey = item[key];

          if (!seen.has(itemKey)) {
            seen.add(itemKey);
            uniqueArray.push(item);
          }
        }

        return uniqueArray;
      }
      const recentFood = JSON.parse(localStorage.getItem("recentFood")) || { products: [] };
      const uniqueArray = removeDuplicates([food, ...recentFood.products], "product_name");
      localStorage.setItem("my-food", JSON.stringify([...foods, food]));
      localStorage.setItem("recentFood", JSON.stringify({ products: uniqueArray }));
    },
    {
      onSuccess: refetch,
    }
  );
  const { mutate: removeFood } = useMutation(
    (id) => {
      localStorage.setItem("my-food", JSON.stringify(foods.filter((food) => food.id !== id)));
    },
    {
      onSuccess: refetch,
    }
  );
  const { mutate: clearAll } = useMutation(
    (id) => {
      localStorage.setItem("my-food", JSON.stringify([]));
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
