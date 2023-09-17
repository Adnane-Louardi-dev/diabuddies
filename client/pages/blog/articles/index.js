import ResponsiveAppBar from "../../../components/ResponsiveAppBar";
import {useQuery} from "@tanstack/react-query";
import LoadingCircle from "../../../components/loadingCircle";
import {useRouter} from "next/router";
import React from "react";
import {SmallArticle} from "../../../components/blog/smallArticle";
import Container from "@mui/material/Container";
import {Button} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Categories} from "../../../components/blog/categories";


export default function Posts({articles,categories}) {
    const {t} = useTranslation("blogStore")


    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <div className={"flex gap-2 flex-wrap justify-center mb-5"}>
            <Link href={"/blog/articles"}>
                <Button className={"bg-diaDarkBlue text-white opacity-100 hover:opacity-100 mx-5"}>
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
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
            {articles.map(({id, attributes}) => <SmallArticle {...attributes} id={id} key={id} />)}
        </div>

    </Container>
}

export async function getStaticProps({locale}) {
    const articles = await axios.get(`${process.env.BACKEND_URL}/blog/articles/10`);
    const categories = await axios.get(`${process.env.BACKEND_URL}/blog/categories`);

    return {
        props: {
            articles: articles.data.data,
            categories: categories.data.data,
            ...(await serverSideTranslations(locale, ['common','blogStore']))
        },
    }
}