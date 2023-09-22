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
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../../../components/ResponsiveAppBar";
import ArticlesList from "../../../components/blog/articlesList";


export default function CategoryArticles({categories,articles}){

    const {t} = useTranslation("blogStore")


    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <div className={"flex gap-2 flex-wrap justify-center mb-5"}>
            <Link href={"/blog/articles"}>
                <Button className={"bg-diaDarkBlue text-white opacity-60 hover:opacity-100 mx-5"}>
                    {t("articles")}
                </Button>
            </Link>
            <Categories categories={categories} />
            <Link href={"/blog/articles/saved"}>
                <Button className={`bg-diaDarkBlue text-white opacity-60 hover:opacity-100 mx-5`}>
                    {t("favoritArticles")}
                </Button>
            </Link>
        </div>
        <ArticlesList articles={articles} />

    </Container>
}


export async function getStaticPaths() {
    const res = await axios.get(`${process.env.BACKEND_URL}/blog/categories/`)
    const categories = await res.data.data
    const paths = categories.map((category) => ({
        params: {slug: `${category.attributes.slug}`},
    }))
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const articles = await axios.get(`${process.env.BACKEND_URL}/blog/categories/${params.slug}`)
    const categories = await axios.get(`${process.env.BACKEND_URL}/blog/categories/`)

    return { props: { articles:articles.data.data,
            categories: categories.data.data,
            ...(await serverSideTranslations("en", ['common','blogStore']))
        } }
}
