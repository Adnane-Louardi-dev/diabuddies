import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";

export const LogoLoading = () => <>
    <Box className={"animate-bounce"}>
        <IconButton size="small" aria-label="account of current user" aria-controls="menu-appbar"
                    aria-haspopup="true" className="text-diaGray">
            <Image src={"/diabuddies_logo_D.webp"} priority height={65} width={65} className="bg-transparent"
                   alt="diabuddies logo"/>
        </IconButton>
    </Box>
</>
