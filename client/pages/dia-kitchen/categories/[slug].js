import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import qs from "qs";
import {RecipeComponent} from "../../../components/dia-kitchen/recipeComponent";
import {useRouter} from "next/router";
import {useGetRecipes, useGetRecipesCategories} from "../../../customeHooks/useKitchen";
import {HomePageSkeleton} from "../../../components/skeleton/homePageSkeleton";
import React from "react";


export const KitchenCategory = () => {
    const router = useRouter();
    const query = qs.stringify({
        filters: {
            recipe_categories: {
                slug: {
                    $eq: router.query.slug
                }
            }
        }
    })
    const {data:recipes, isError, isLoading} = useGetRecipes(query)
    const {data:recipesCategories, isError:categoriesError, isLoading:categoriesLoading} = useGetRecipesCategories()
    if(isLoading){ // Error Page
        return <HomePageSkeleton />
    }
    if(isError){
        router.push("/app")
    }
    return <div>

        {!categoriesLoading && !categoriesError && <pre>
            {JSON.stringify(recipesCategories, null, 2)}
        </pre>}

        <div className={"grid grid-cols-4"}>
            {recipes.map(({attributes, id}) => <RecipeComponent recipe={attributes} id={id} key={id} /> )}
        </div>
    </div>
}


export default KitchenCategory;


export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "index"])),
    },
});