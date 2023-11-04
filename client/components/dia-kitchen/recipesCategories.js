import Link from "next/link";
import { Button } from "@mui/material";

export const RecipesCategories = ({ categories }) => {
  return (
    <div className={"flex gap-2"}>
      {categories.map(({ attributes }) => (
        <Link href={`/dia-kitchen/categories/${attributes.slug}`} key={attributes.slug}>
          <Button className={"ring-1 ring-diaDarkBlue text-diaDarkBlue text-sm rounded-lg capitalize font-poppins shadow-lg"}>{attributes.name}</Button>
        </Link>
      ))}
    </div>
  );
};
