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


export default function Posts() {
    const router = useRouter()
    const {data:articles, isLoading} = useQuery({
        queryKey: ["articles"],
        queryFn:async () => {
            const {data} = await axios.get("/api/blog/articles/10")
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
            <Link href={"/blog/articles/saved"}>
                <Button className={"bg-gray-300 text-gray-800"}>
                    {t("favoritArticles")}
                </Button>
            </Link>
        </div>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
            {articles.data.map(({id, attributes}) => <SmallArticle {...attributes} id={id} key={id} />)}
        </div>

    </Container>
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common','blogStore']))
    }
});
