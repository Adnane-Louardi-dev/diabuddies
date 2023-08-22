import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import LoadingCircle from "../../../components/loadingCircle";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../../../components/ResponsiveAppBar";
import {Article} from "../../../components/blog/article";
import axios from "axios";


export default function Post() {
    const router = useRouter()
    const {id} = router.query
    const {data:article, isLoading} = useQuery({
        queryKey: ["article",id],
        queryFn:async () => {
            const {data} = await axios.get(`/api/blog/article/${id}`)
            return data
        },
        enabled: router.isReady
    })

    if(isLoading) {
        return <LoadingCircle />
    }
    console.log("article", article)
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />

        <Article id={article.data.id}
                 isLiked={article.isLiked}
                 likeCount={article.likeCount}
                 relatedArticles={article.relatedArticles}
                 {...article.data.attributes} />

    </Container>
}
