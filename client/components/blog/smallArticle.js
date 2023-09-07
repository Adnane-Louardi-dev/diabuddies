import React from "react";
import Link from "next/link";
import {ShareBlog} from "./shareBlog";
import {WishedIcon} from "../store/wishedIcon";
import {useTranslation} from "next-i18next";
import {getDir} from "../../utils/getDir";


export const SmallArticle = ({id,title,introduction, image}) => {
    const thumbnail = image ? image.data.attributes : ""
    const {i18n} = useTranslation()
    return <article className="max-w-xs mx-auto h-[400px]" dir={getDir(i18n.language)}>
            <Link href={`/blog/articles/${id}`}>
                <img src={`http://localhost:1337${thumbnail.url}`} className="mb-5 rounded-lg h-[200px]" alt={thumbnail.name} width={"100%"} height={"auto"} />
            </Link>
            <Link href={`/blog/articles/${id}`}>
                <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">{title}</h2>
            </Link>
            <Link href={`/blog/articles/${id}`}>
                <p className="font-light text-gray-500 h-[100px]">{introduction}</p>
            </Link>
            <div className={"w-full text-right"}>
                <ShareBlog title={title} />
                <WishedIcon itemId={id} type={"blog"} />
            </div>
        </article>
}