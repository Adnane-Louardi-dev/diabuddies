import {SmallArticle} from "./smallArticle";
import React from "react";


export default function ArticlesList({articles,ref=null}){

    return <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(({id, attributes},index) => index !== articles.length - 1 ?
            <SmallArticle {...attributes} id={id} key={id} /> :
            <div ref={ref}>
                <SmallArticle {...attributes} id={id} key={id} />
            </div>)}
    </div>
}