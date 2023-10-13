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
import axios from "axios";
import ArticlesList from "../../../components/blog/articlesList";


export default function Saved({categories}){
    const {wishedItems, isLoading} = useGetWishListItems("blog")

    console.log("wishedItems", wishedItems)
    const {t} = useTranslation("blogStore")
    if(isLoading){
        return <LoadingCircle />
    }

    return <BlogLayout articles={<ArticlesList articles={wishedItems} />}>
        <Link href={"/blog/articles/saved"} className={"w-full"}>
            <Button className={`bg-diaDarkBlue w-full text-white opacity-100 hover:opacity-100`}>
                {t("favoritArticles")}
            </Button>
        </Link>
        <Link href={"/blog/articles"}>
            <Button className={"bg-diaDarkBlue text-white opacity-60 hover:opacity-100"}>
                {t("articles")}
            </Button>
        </Link>
        <Categories categories={categories} />
    </BlogLayout>
}


export async function getStaticProps() {
    const categories = await axios.get(`${process.env.BACKEND_URL}/blog/categories/`)

    return { props: {
            categories: categories.data.data,
            ...(await serverSideTranslations("en", ['common','blogStore']))
        } }
}
