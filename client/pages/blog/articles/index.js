import ResponsiveAppBar from "../../../components/layout/ResponsiveAppBar";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import LoadingCircle from "../../../components/loadingCircle";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {SmallArticle} from "../../../components/blog/smallArticle";
import Container from "@mui/material/Container";
import {Button, Typography} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Categories} from "../../../components/blog/categories";
import qs from "qs";
import {articleQuery} from "../../../utils/baseQueries";
import {useElementOnScreen} from "../../../customeHooks/useElementOnScreen";
import ArticlesList from "../../../components/blog/articlesList";
import {BlogLayout} from "../../../components/store/blogLayout";

const PAGE_SIZE = 3
export default function Posts({articles:initialArticles,categories}) {
    const {t} = useTranslation("blogStore")
    const [ref,isVisible] = useElementOnScreen({
        threshold: 0.8
    })
    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
        ["infinitArticles"],
        async ({pageParam = 1}) => {
            const query = qs.stringify({
                pagination: {
                    page: pageParam,
                    pageSize: PAGE_SIZE
                }
            })
            const {data:articles} = await axios.get(`/api/service-api/articles?${query}&${articleQuery}`)
            return articles.data;
        }, {
            getNextPageParam: (_,pages) => {
                return pages.length + 1
            },
            initialData: {
                pages: Array.from({length: Math.ceil(initialArticles.length / PAGE_SIZE)}, (_, i) =>
                    initialArticles.slice(i * PAGE_SIZE, (i+1) * PAGE_SIZE)
                ),
                pageParams: Array.from({length: Math.ceil(initialArticles.length / PAGE_SIZE)}, (_,i)=> i+1)
            }
        })
    const articles = data?.pages.flatMap((page)=>page) ?? initialArticles;
    useEffect(() => {
        if(isVisible){
            fetchNextPage()
        }
    }, [isVisible]);
    return <BlogLayout articles={<ArticlesList articles={articles} ref={ref} />}>
            <Link href={"/blog/articles/saved"} className={"w-full"}>
                <Button className={`bg-diaDarkBlue w-full text-white opacity-60 hover:opacity-100`}>
                    {t("favoritArticles")}
                </Button>
            </Link>
            <Link href={"/blog/articles"}>
                <Button className={"bg-diaDarkBlue text-white opacity-100 hover:opacity-100"}>
                    {t("articles")}
                </Button>
            </Link>
            <Categories categories={categories} />
    </BlogLayout>
}

export async function getStaticProps({locale}) {
    const articles = await axios.get(`${process.env.BACKEND_URL}/blog/articles/9`);
    const categories = await axios.get(`${process.env.BACKEND_URL}/blog/categories`);

    return {
        props: {
            articles: articles.data.data,
            categories: categories.data.data,
            ...(await serverSideTranslations(locale, ['common','blogStore']))
        },
    }
}