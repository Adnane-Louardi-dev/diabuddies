import {BlogLayout} from "../../../components/store/blogLayout";
import {useGetWishListItems} from "../../../customeHooks/wishListHooks";
import LoadingCircle from "../../../components/loadingCircle";
import {SmallArticle} from "../../../components/blog/smallArticle";
import React from "react";
import Typography from "@mui/material/Typography";


export default function Saved(){
    const {wishedItems, isLoading} = useGetWishListItems("blog")

    if(isLoading){
        return <LoadingCircle />
    }

    console.log("wish ",wishedItems)
    return <BlogLayout>

        <Typography typography={"h4"} className={"mb-3"} textAlign={"center"}>My Favorite Articles</Typography>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {wishedItems.map(({id, attributes}) => <SmallArticle {...attributes} id={id} key={id} />)}
        </div>


    </BlogLayout>
}