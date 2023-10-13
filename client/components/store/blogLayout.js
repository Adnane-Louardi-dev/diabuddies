import Container from "@mui/material/Container";
import ResponsiveAppBar from "../layout/ResponsiveAppBar";
import ArticlesList from "../blog/articlesList";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Button} from "@mui/material";
import {Categories} from "../blog/categories";
import React from "react";


export const BlogLayout = ({children, articles}) => {
  return <Container maxWidth={"xl"}>
          <ResponsiveAppBar />
          <div className={"grid grid-cols-12 gap-4 mb-10"}>
              <div className={"order-2 sm:order-1 col-span-12 sm:col-span-8 md:col-span-9"}>
                  {articles}
              </div>
              <div className={"order-1 sm:order-2 col-span-12 sm:col-span-4 md:col-span-3"}>
                  <div className={"bg-diaBlue rounded-md p-5 mt-5 sm:mt-0 sm:min-h-[400px]"}>
                      <Typography align={"start"} variant={"h5"} sx={{color: "#fff"}}>Blog Categories</Typography>
                      <hr className={"mb-3"}/>
                      <div className={"flex gap-1 gap-y-1 flex-wrap justify-start mb-5"}>
                          {children}
                      </div>
                  </div>
              </div>
          </div>
        </Container>
}