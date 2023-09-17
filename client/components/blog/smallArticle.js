import React from "react";
import Link from "next/link";
import {ShareBlog} from "./shareBlog";
import {WishedIcon} from "../store/wishedIcon";
import {useTranslation} from "next-i18next";
import {getDir} from "../../utils/getDir";
import {ArticleCategories} from "./articleCategories";


export const SmallArticle = ({id,title,introduction, image,categories, horizental=false}) => {
    const thumbnail = image ? image.data.attributes : ""
    const {i18n} = useTranslation()
    return <article className={`w-full ${!horizental ? "w-[340px]" : ""} mx-auto grid ${horizental ? "grid-cols-2" : "grid-cols-1"} gap-4 border-2 border-diaDarkBlue border-solid px-14 py-8 rounded-md hover:shadow-xl hover:cursor-pointer relative`}>
            <div className={""}>
                <Link href={`/blog/article/${id}`}>
                    <img src={`http://localhost:1337${thumbnail.url}`} className="mb-2 rounded-lg h-[200px] mb-5" alt={thumbnail.name} width={"100%"} height={"auto"} />
                </Link>
            </div>
            <div dir={getDir(i18n.language)}>
                <Link href={`/blog/article/${id}`}>
                    <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">{title}</h2>
                </Link>
                <Link href={`/blog/article/${id}`}>
                    <p className={`font-light text-gray-500 h-[100px] mb-5`}>{introduction}</p>
                </Link>
                <div className={"max-w-[calc(100%-120px)] overflow-hidden absolute bottom-2 left-4"}>
                    <ArticleCategories categories={categories?.data} />
                </div>
                <div className={"w-full text-right absolute bottom-2 right-4"}>
                    <ShareBlog title={title} />
                    <WishedIcon itemId={id} type={"blog"} />
                </div>
            </div>
        </article>
}