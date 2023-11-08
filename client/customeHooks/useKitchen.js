import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {recipeQuery} from "../utils/baseQueries";


export const useGetRecipes = (query) => useQuery(["get-recipes", query], async ()=>{
    const {data} = await axios.get(`/api/service-api/recipes?${recipeQuery}${query ? '&' + query : ""}`)
    return data.data;
},{
    onError: () => {
        return []
    }
})

export const useGetRecipe = (recipeId) => useQuery(["get-recipes", recipeId], async ()=>{
    const {data} = await axios.get(`/api/service-api/recipes/${recipeId}?${recipeQuery}`)
    return data.data;
})

export const useGetRecipesCategories = (query) => useQuery(["get-recipes-categories", query], async ()=>{
    const {data} = await axios.get(`/api/service-api/recipe-categories?${query}`)
    return data.data;
})

export const useCreateNewRecipe = () => useMutation(async (data)=>{
    return await axios.post("/api/service-api/recipe-categories", data)
})