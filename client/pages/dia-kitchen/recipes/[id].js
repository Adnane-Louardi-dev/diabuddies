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
import {useGetRecipe, useGetRecipes} from "../../../customeHooks/useKitchen";
import {HomePageSkeleton} from "../../../components/skeleton/homePageSkeleton";
import ResponsiveAppBar from "../../../components/layout/ResponsiveAppBar";


export const KitchenRecipe = () => {
    const router = useRouter();
    const {data:recipe, isError:isRecipeError, isLoading:isRecipeLoading} = useGetRecipe(router.query.id)
    const {user, isLoading, isError} = useGetCurrentUserDetailed()
    const {name, ingredients, directions, serves, kcal, carbs, fat, protein ,createdDate, image, recipe_categories} = recipe?.attributes ?? {};
    const {attributes:thumbnail} = image?.data ?? {attributes: {url: "", name: ""}};

    const bolus = useMemo(()=>{
        if(!isLoading && !isError){
            return CalculatingBolus(carbs, user.diabeticDetails.carbsRatio, user.diabeticDetails.insulinSensitivity.value, 0);
        }
    },[kcal, carbs, isLoading,isError])

    if(isRecipeLoading){
        return <HomePageSkeleton />
    }
    if(isRecipeError){
        return router.push("/dia-kitchen/recipes")
    }

    const nutritionData = [
        {
            label: "Kcal",
            value: kcal,
            unit: "kcal",
            color: "diaBlue",
            hexColor: "#3AB0FF"
        },
        {
            label: "Bolus",
            value: bolus,
            unit: "UI",
            color: "diaOrange",
            hexColor: "#FFB562"
        },
        {
            label: "Carbs",
            value: carbs,
            unit: "g",
            color: "diaRed",
            hexColor: "#F87474"
        },
        {
            label: "Protein",
            value: protein,
            unit: "g",
            color: "diaDarkBlue",
            hexColor: "#1e293b"
        },
        {
            label: "Fat",
            value: fat,
            unit: "g",
            color: "diaGreen",
            hexColor: "#44D29F"
        },
    ]
    return <>
        <ResponsiveAppBar />
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article
                    className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
                    <header dir={"ltr"} className="mb-4 lg:mb-6 not-format">
                        <address className="flex justify-between mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                                <div>
                                        <span rel="author"
                                              className="text-xl font-bold text-gray-900">{name}</span>
                                    <p className="text-base font-light text-gray-500">
                                        <time pubdate dateTime={createdDate} title={createdDate}>
                                            {createdDate}
                                        </time>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <ShareBlog title={name} />
                                {/*<WishedIcon itemId={id} type={"blog"} />*/}
                            </div>
                        </address>
                        <RecipesCategories categories={recipe_categories?.data ?? []} />
                        <h1 dir={"ltr"} className="my-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                            {name}
                        </h1>
                    </header>
                    <div className={"w-full h-[400px] relative mb-2"}>
                        <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnail.url}`} layout="fill" objectFit="cover" className="rounded-2xl " alt={thumbnail.name} />
                    </div>
                    <div className={"flex justify-between"}>
                        <p>
                            Serves: {serves}
                        </p>
                        <AddRecipeAsLogButton log={{kcal,carbs,fat, protein, bolus}} />
                    </div>
                    <RecipeNutritionDistribution nutritionData={nutritionData} />
                    <br />
                    <Typography variant={"h5"} align={"center"} className={"border-2 border-diaBlue text-diaBlue py-2 rounded-xl"}>
                        {"Ingredients"}
                    </Typography>
                    <br />
                    <RenderMarkup content={ingredients} />
                    <Typography variant={"h5"} align={"center"} className={"border-2 border-diaBlue text-diaBlue py-2 rounded-xl"}>
                        {"Directions"}
                    </Typography>
                    <br />
                    <RenderMarkup content={directions} />
                </article>
            </div>
        </main>

        </>
}

export default KitchenRecipe;


export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "index"])),
    },
});