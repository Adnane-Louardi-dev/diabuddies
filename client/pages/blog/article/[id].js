import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import LoadingCircle from "../../../components/loadingCircle";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../../../components/ResponsiveAppBar";
import {Article} from "../../../components/blog/article";
import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export default function Post({article}) {
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />

        <Article id={article.data.id}
                 isLiked={article.isLiked}
                 likeCount={article.likeCount}
                 relatedArticles={article.relatedArticles}
                 {...article.data?.attributes} />

    </Container>
}

export async function getStaticPaths() {
    const res = await axios.get(`${process.env.BACKEND_URL}/blog/articles/100`)
    const articles = await res.data.data
    const paths = articles.map((article) => ({
        params: {id: `${article.id}`},
    }))
    return { paths, fallback: false }
}


export async function getStaticProps({ params, locale}) {
    const res = await axios.get(`${process.env.BACKEND_URL}/blog/article/${params.id}`)
    const article = await res.data;

    return { props: { article,
            ...(await serverSideTranslations(locale, ['common','blogStore']))
        } }
}