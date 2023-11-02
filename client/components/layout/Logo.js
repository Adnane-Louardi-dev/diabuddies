import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";

export const Logo = () => (
  <>
    <Box sx={{ flexGrow: 1, ml: -2, display: { xs: "flex", md: "none" } }}>
      <Link href={"/app"}>
        <IconButton size="small" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" className="text-diaGray">
          <Image src={"/diabuddies_logo_D_white_background.png"} priority height={55} width={55} className="bg-transparent m-2 shadow-lg rounded-xl" alt="diabuddies logo" />
        </IconButton>
      </Link>
    </Box>
    <Box sx={{ flexGrow: 1, ml: -2, display: { xs: "none", md: "flex" } }}>
      <Link href={"/app"}>
        <div className="relative">
          <Image src={"/diabuddies_logo.png"} width={130} height={90} className="bg-transparent my-0 mx-5" alt="diabuddies logo" />
        </div>
      </Link>
    </Box>
  </>
);
