import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {recipeQuery} from "../../../utils/baseQueries";
import {ShareBlog} from "../../../components/blog/shareBlog";
import React, {useMemo} from "react";
import {useGetHTML} from "../../../customeHooks/useGetHTML";
import Image from "next/image";
import qs from "qs";
import {RenderMarkup} from "../../../components/layout/renderMarkup";
import {Button, Typography} from "@mui/material";
import {RecipeNutritionDistribution} from "../../../components/charts/recipeNutritionDistribution";
import {RecipesCategories} from "../../../components/dia-kitchen/recipesCategories";
import {Icon} from "@iconify/react";
import {useGetCurrentUserDetailed} from "../../../customeHooks/useGetCurrentUser";
import CalculatingBolus from "../../../utils/calculateBolus";
import {useRouter} from "next/router";
import {addRecipeAsLog} from "../../../customeHooks/useAddFood";
import {AddRecipeAsLogButton} from "../../../components/dia-kitchen/addRecipeAsLogButton";
import {RecipeComponent} from "../../../components/dia-kitchen/recipeComponent";
import {useGetRecipes} from "../../../customeHooks/useKitchen";
import {HomePageSkeleton} from "../../../components/skeleton/homePageSkeleton";
import ResponsiveAppBar from "../../../components/layout/ResponsiveAppBar";
import Container from "@mui/material/Container";


export const KitchenRecipe = () => {
    const router = useRouter()
    const {data:recipes, isError, isLoading} = useGetRecipes()
    if(isLoading){ // Error Page
        return <HomePageSkeleton />
    }
    if(isError){
        router.push("/app")
    }
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map(({attributes, id}) => <RecipeComponent recipe={attributes} id={id}  />)}
        </div>
    </Container>
}

export default KitchenRecipe;


export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "index"])),
    },
});