import { useRouter } from 'next/router';
import Select from "@mui/material/Select";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";

export default function LanguageSwitcher({lang}) {
    const router = useRouter();
    if(lang === "en"){
        return <IconButton
            className={"fixed bottom-10 right-10"}
            onClick={()=>{
                router.push(
                    {
                        pathname: router.pathname,
                        query: router.query,
                    },
                    null,
                    {locale: "ar"}
                )
            }}
        >
            <Icon icon={"emojione:flag-for-morocco"} />
        </IconButton>
    }
    return (
        <IconButton
            className={"fixed bottom-10 right-10"}
            onClick={()=>{
                router.push(
                    {
                        pathname: router.pathname,
                        query: router.query,
                    },
                    null,
                    {locale: "en"}
                )
            }}
        >
            <Icon icon={"emojione:flag-for-united-kingdom"} />
        </IconButton>
    );
}