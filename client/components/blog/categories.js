import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "../loadingCircle";
import {Button} from "@mui/material";
import Link from "next/link";
import React from "react";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";


export const Categories = ({categories}) => {
  const router = useRouter()
  const {t} = useTranslation()
  const currentSlug = router.query.slug
  return <>
      {categories.map(({attributes})=>(
          <Link href={`/blog/articles/${attributes.slug}`} key={attributes.slug}>
              <Button className={`bg-diaDarkBlue text-white hover:opacity-100 ${currentSlug === attributes.slug ? "opacity-100" : "opacity-60"} mx-5`}>
                  {attributes.name}
              </Button>
          </Link>
          ))}
  </>
}