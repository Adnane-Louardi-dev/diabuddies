import {BlogLayout} from "../../../components/store/blogLayout";
import {useGetWishListItems} from "../../../customeHooks/wishListHooks";
import LoadingCircle from "../../../components/loadingCircle";
import {SmallArticle} from "../../../components/blog/smallArticle";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import {Button} from "@mui/material";
import {Categories} from "../../../components/blog/categories";


export default function Saved(){
    const {wishedItems, isLoading} = useGetWishListItems("blog")
    const {t} = useTranslation("blogStore")
    if(isLoading){
        return <LoadingCircle />
    }

    console.log("wish ",wishedItems)
    return <BlogLayout>
        <div className={"text-center mb-5"}>
            <Link href={"/blog/articles"}>
                <Button className={"bg-diaDarkBlue text-white opacity-60 hover:opacity-100 mx-5"}>
                    {t("articles")}
                </Button>
            </Link>
            <Categories />

            <Link href={"/blog/articles/saved"}>
                <Button className={`bg-diaDarkBlue text-white opacity-100 hover:opacity-100 mx-5`}>
                    {t("favoritArticles")}
                </Button>
            </Link>
        </div>

        <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
            {wishedItems.map(({id, attributes}) => <SmallArticle {...attributes} id={id} key={id} />)}
        </div>


    </BlogLayout>
}


export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common','blogStore']))
    }
});
