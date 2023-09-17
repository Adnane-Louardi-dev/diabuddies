import Link from "next/link";


export const ArticleCategories = ({categories}) => {
    return <div className={"flex gap-2"}>
        {categories.map(({attributes})=>(
            <Link href={`/blog/articles/${attributes.slug}`} className={"block px-2 py-1 border-2 w-fit h-[35px] border-solid border-diaBlue text-diaBlue text-sm font-light rounded-md"} key={attributes.slug}>
                {attributes.name}
            </Link>
        ))}
    </div>
}