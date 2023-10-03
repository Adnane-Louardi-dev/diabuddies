import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Link from "next/link";
import {Icon} from "@iconify/react";
import * as React from "react";


export const Footer = () =>
    <footer className={"fixed bottom-0 left-0 z-[1000]"}>
        <ToggleButtonGroup
            className={"w-full h-16 bg-diaDarkBlue grid grid-cols-3 fixed bottom-0 left-0"}
            sx={{
                "& .MuiToggleButtonGroup-root , .MuiButtonBase-root": {
                    borderWidth: 2,
                    margin: 0,
                    padding: 0
                }
            }}
            color="primary"
            exclusive
            aria-label="Platform"
        >
            <ToggleButton value={30} className={"h-full w-full border-r-2"}>
                <Link href={"/app"} className={"w-full h-full flex justify-center align-middle"}>
                    <Icon icon={"bi:book"} className={`h-7 w-7 m-auto text-white`}/>
                </Link>
            </ToggleButton>
            <ToggleButton value={7} className={"h-full w-full border-r-2"}>
                <Link href={"/store"} className={"w-full h-full flex justify-center align-middle"}>
                    <Icon icon={"iconamoon:store-light"} className={`h-7 w-7 m-auto text-white`}/>
                </Link>
            </ToggleButton>
            <ToggleButton value={0} className={"h-full w-full"}>
                <Link href={"/blog/articles"} className={"w-full h-full flex justify-center align-middle"}>
                    <Icon icon={"majesticons:article-line"} className={`h-7 w-7 m-auto text-white`}/>
                </Link>
            </ToggleButton>
        </ToggleButtonGroup>
    </footer>