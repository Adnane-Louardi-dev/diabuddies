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
    <article className={`w-full ${!horizental ? "w-[340px]" : ""} mx-auto grid ${horizental ? "grid-cols-2" : "grid-cols-1"} gap-5 px-4 py-2 rounded-2xl shadow-xl hover:shadow-xl hover:cursor-pointer `}>
      <div className={"relative rounded-lg h-[200px] w-full"}>
        <Link href={`/blog/article/${id}`}>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnail.url}`} layout="fill" objectFit="cover" className="rounded-2xl " alt={thumbnail.name} />
        </Link>
        <div className="flex justify-end m-2">
          <div>
            <WishedIcon itemId={id} type={"blog"} />
          </div>
        </div>
      </div>
      <div dir={"rtl"} className="relative">
        <Link href={`/blog/article/${id}`}>
          <h2 className="mb-2 text-xl font-bold font-tajawal leading-tight text-diaDarkBlue">{title}</h2>
        </Link>
        <Link href={`/blog/article/${id}`}>
          <p className={`font-light font-rubik text-diaGray h-[100px]`}>{introduction}</p>
        </Link>
        <div className="flex justify-between items-center">
          <ShareBlog title={title} />
          <ArticleCategories categories={categories?.data} />
        </div>
      </div>
    </article>
  );
};
