import React from "react";
import Link from "next/link";
import {ShareBlog} from "./shareBlog";
import {WishedIcon} from "../store/wishedIcon";
import {useTranslation} from "next-i18next";
import {getDir} from "../../utils/getDir";


export const SmallArticle = ({id,title,introduction, image}) => {
    const thumbnail = image ? image.data.attributes : ""
    const {i18n} = useTranslation()
    return <article className="w-full mx-auto grid grid-cols-2 gap-4 border-2 border-diaDarkBlue border-solid px-14 py-8 rounded-md hover:shadow-xl hover:cursor-pointer relative">
            <div className={""}>
                <Link href={`/blog/articles/${id}`}>
                    <img src={`http://localhost:1337${thumbnail.url}`} className="mb-5 rounded-lg h-[200px]" alt={thumbnail.name} width={"100%"} height={"auto"} />
                </Link>
            </div>
            <div dir={getDir(i18n.language)}>
                <Link href={`/blog/articles/${id}`}>
                    <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">{title}</h2>
                </Link>
                <Link href={`/blog/articles/${id}`}>
                    <p className="font-light text-gray-500 h-[100px]">{introduction}</p>
                </Link>
                <div className={"w-full text-right absolute bottom-2 right-4"}>
                    <ShareBlog title={title} />
                    <WishedIcon itemId={id} type={"blog"} />
                </div>
            </div>
        </article>
}