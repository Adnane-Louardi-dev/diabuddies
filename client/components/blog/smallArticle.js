import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShareBlog } from "./shareBlog";
import { WishedIcon } from "../store/wishedIcon";
import { useTranslation } from "next-i18next";
import { getDir } from "../../utils/getDir";
import { ArticleCategories } from "./articleCategories";

export const SmallArticle = ({ id, title, introduction, image, categories, horizental = false }) => {
  const thumbnail = image ? image.data.attributes : "";
  const { i18n } = useTranslation();
  return (
    <article className={`w-full ${!horizental ? "w-[340px]" : ""} mx-auto grid ${horizental ? "grid-cols-2" : "grid-cols-1"} gap-4 px-4 py-2 rounded-md hover:shadow-xl hover:cursor-pointer`}>
      <div className={"mb-5 rounded-lg h-[200px] w-full"}>
        <Link href={`/blog/article/${id}`}>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnail.url}`} layout="fill" objectFit="cover" className="h-[200px]" alt={thumbnail.name} />
        </Link>
      </div>
      <div dir={"rtl"}>
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
  );
};
