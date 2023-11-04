import Link from "next/link";
import Image from "next/image";
import {ArticleCategories} from "../blog/articleCategories";
import React, {useMemo} from "react";
import {Icon} from "@iconify/react";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {useGetCurrentUserDetailed} from "../../customeHooks/useGetCurrentUser";
import CalculatingBolus from "../../utils/calculateBolus";
import {RecipesCategories} from "./recipesCategories";
import {addRecipeAsLog} from "../../customeHooks/useAddFood";
import {AddRecipeAsLogButton} from "./addRecipeAsLogButton";
import {WishedIcon} from "../store/wishedIcon";

export const RecipeComponent = ({recipe, id}) => {
    const router = useRouter()
    const {serves, kcal, carbs, fat, protein, image, name, recipe_categories} = recipe;
    const {user, isLoading, isError} = useGetCurrentUserDetailed()

    const {attributes:thumbnail} = image.data ?? {attributes: {url: "", name: ""}};

    const bolus = useMemo(()=>{
        if(!isLoading && !isError){
            return CalculatingBolus(carbs, user.diabeticDetails.carbsRatio, user.diabeticDetails.insulinSensitivity.value, 0);
        }
    },[kcal, carbs, isLoading,isError])


    return (
        <article className={`w-full mx-auto px-4 py-2 rounded-2xl shadow-xl hover:shadow-xl hover:cursor-pointer `}>
            <div className={"relative rounded-lg h-[200px] w-full"}>
                <Link href={`/dia-kitchen/recipes/${id}`}>
                    <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnail.url}`} layout="fill" objectFit="cover" className="rounded-2xl " alt={thumbnail.name} />
                </Link>
                <div className="flex justify-end m-2">
                    <div>
                        <WishedIcon itemId={id} type={"recipe"} />
                    </div>
                </div>
            </div>
            <div dir={"ltr"} className="relative">
                <Link href={`/dia-kitchen/recipes/${id}`}>
                    <h2 className="my-2 text-xl font-bold font-tajawal leading-tight text-diaDarkBlue">{name}</h2>
                </Link>
                <p className={`font-light font-rubik text-diaGray h-[100px]`}>{serves} Serves, {kcal} kcal, {carbs} carbs {bolus ? `, ${bolus} UI` : ""}</p>
                <div className="flex justify-between items-center">
                    {/*<ShareBlog title={name} />*/}
                    <RecipesCategories categories={recipe_categories?.data} />
                    <AddRecipeAsLogButton log={{kcal,carbs,fat, protein, bolus}} />
                </div>
            </div>
        </article>
    );
}