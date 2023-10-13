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
import ResponsiveAppBar from "../../../components/layout/ResponsiveAppBar";
import ArticlesList from "../../../components/blog/articlesList";


export default function CategoryArticles({categories,articles}){

    const {t} = useTranslation("blogStore")

    return <BlogLayout articles={<ArticlesList articles={articles} />}>
        <Link href={"/blog/articles/saved"} className={"w-full"}>
            <Button className={`bg-diaDarkBlue w-full text-white opacity-60 hover:opacity-100`}>
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
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <div className={"grid grid-cols-12 gap-4"}>
            <div className={"order-2 sm:order-1 col-span-12 sm:col-span-8 md:col-span-9"}>
            </div>
            <div className={"order-1 sm:order-2 col-span-12 sm:col-span-4 md:col-span-3"}>
                <div className={"bg-diaBlue rounded-md p-5 mt-5 sm:mt-0 sm:min-h-[400px]"}>
                    <Typography align={"start"} variant={"h5"} sx={{color: "#fff"}}>Blog Categories</Typography>
                    <hr className={"mb-3"}/>
                    <div className={"flex gap-1 gap-y-1 flex-wrap justify-start mb-5"}>

                    </div>
                </div>
            </div>
        </div>
    </Container>
}


export async function getStaticPaths() {
    const res = await axios.get(`${process.env.BACKEND_URL}/blog/categories/`).catch(()=> ({data: {data: []}}))
    const categories = await res.data.data
    const paths = categories.map((category) => ({
        params: {slug: `${category.attributes.slug}`},
    }))
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const articles = await axios.get(`${process.env.BACKEND_URL}/blog/categories/${params.slug}`).catch(()=> ({data: {data: []}}))
    const categories = await axios.get(`${process.env.BACKEND_URL}/blog/categories/`).catch(()=> ({data: {data: []}}))

    return { props: { articles:articles.data.data,
            categories: categories.data.data,
            ...(await serverSideTranslations("en", ['common','blogStore']))
        } }
}
