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


export default function CategoryArticles(){
    const router = useRouter()
    const {data:articles, isLoading} = useQuery({
        queryKey: ["categoryArticles",router.query.slug],
        queryFn:async () => {
            const {data} = await axios.get(`/api/blog/categories/${router.query.slug}`)
            return data
        }
    })
    const {t} = useTranslation("blogStore")

    if(isLoading) {
        return <LoadingCircle />
    }

    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <div className={"text-center mb-5"}>
            <Link href={"/blog/articles"}>
                <Button className={"bg-diaDarkBlue text-white opacity-60 hover:opacity-100 mx-5"}>
                    {t("articles")}
                </Button>
            </Link>
            <Categories />
            <Link href={"/blog/articles/saved"}>
                <Button className={`bg-diaDarkBlue text-white opacity-60 hover:opacity-100 mx-5`}>
                    {t("favoritArticles")}
                </Button>
            </Link>
        </div>
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
            {articles.data.map(({id, attributes}) => <SmallArticle {...attributes} id={id} key={id} />)}
        </div>

    </Container>
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common','blogStore']))
    }
});

