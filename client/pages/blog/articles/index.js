import {blogAxios} from "../../../lib/blogAuthConfig";
import ResponsiveAppBar from "../../../components/ResponsiveAppBar";
import {useQuery} from "@tanstack/react-query";
import LoadingCircle from "../../../components/loadingCircle";
import {useRouter} from "next/router";
import React from "react";
import {SmallArticle} from "../../../components/blog/smallArticle";
import Container from "@mui/material/Container";
import {Button} from "@mui/material";
import Link from "next/link";


export default function Posts() {
    const router = useRouter()
    const {data:articles, isLoading} = useQuery({
        queryKey: ["articles"],
        queryFn:async () => {
            const {data} = await blogAxios.get("/api/articles?populate=image")
            return data
        }
    })

    if(isLoading) {
        return <LoadingCircle />
    }

    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />

        <div className={"text-center mb-5"}>
            <Link href={"/blog/articles/saved"}>
                <Button className={"bg-gray-300 text-gray-800"}>
                    My Favorite Articles
                </Button>
            </Link>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {articles.data.map(({id, attributes}) => <SmallArticle {...attributes} id={id} key={id} />)}
        </div>

    </Container>
}
