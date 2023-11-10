import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import * as React from "react";
import {useGetWishListItems} from "../../customeHooks/wishListHooks";
import Image from "next/image";
import {RecipeComponent} from "../dia-kitchen/recipeComponent";
import RecipeLessDetailed from "./RecipeLessDetailed";
import {useGetRecipes} from "../../customeHooks/useKitchen";
import qs from "qs";


export const SearchForRecipe = () => {
    const {data:favRecipes, isLoading, isError} = useGetWishListItems("recipe")
    const {data:recipes} = useGetRecipes(qs.stringify({
        pagination: {
            page: 0,
            pageSize: 3
        }
    }))

    return <>
        {/*Make a Filter to filter recipes based on (meal time - carbs - meal category)*/}
        <div className="flex px-5 py-3">
            <TextField fullWidth sx={{ "& fieldset": { borderRadius: "10px" }, "& input": { padding: "1rem" } }} label="Search" id="fullWidth"
                       // value={searchQuery || ""}
                       // onChange={(newSearchQuery) => setsearchQuery(newSearchQuery.target.value || "")}
            />
            <Button
                onClick={() => {
                    setIsSearching(true);
                    refetch();
                }}
                className="flex items-center rounded-lg bg-diaDarkBlue ml-4"
            >
                <Icon icon="tabler:search" className="self-center text-white h-7 w-7" />
            </Button>
        </div>
        {(isError || favRecipes?.length === 0) && (
            <div className="p-5">
                <div className="flex p-3 items-center justify-center rounded-lg bg-diaRed">
                    <h1 className="font-rubik text-lg text-white">No Food found</h1>
                </div>
            </div>
        )}
        {isLoading && !isError ? <section className="grid h-screen justify-center content-center pb-32">
            <div className="flex items-start">
                <Image src={"/loading_skelton_searchForFood.png"} alt={"loading_skelton_searchForFood"} height={300} width={300} className="" />
            </div>
            <div className="text-center my-2">
                <h2 className="text-3xl font-poppins font-semibold text-diaDarkBlue">Fetching Food . . .</h2>
            </div>
        </section> : <section className="my-5">
            {favRecipes ?<section>
                <h3 className="font-sourceCode text-diaGray text-md">Your Favorite Recipes</h3>
                <section className="flex snap-x snap-mandatory p-3 gap-5 w-full overflow-x-scroll no-scrollbar">
                    {favRecipes?.map((recipe) => (
                        <RecipeLessDetailed recipe={recipe} key={recipe.id}/>
                    ))}
                </section>
            </section>:null}
            {recipes ?<section className="my-5">
                <h3 className="font-sourceCode text-diaGray text-md">Some Suggested Recipes</h3>
                <section className="flex snap-x snap-mandatory p-3 gap-5 w-full overflow-x-scroll no-scrollbar">
                    {recipes?.map((recipe) => (
                        <RecipeLessDetailed recipe={recipe} key={recipe.id}/>
                    ))}
                </section>
            </section>:null}
        </section>}
    </>
}