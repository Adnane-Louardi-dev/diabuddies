import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Link from "next/link";
import { Icon } from "@iconify/react";
import * as React from "react";

export const Footer = () => (
  <footer className={"w-full fixed bottom-0 left-0 z-[1000]"}>
    <ToggleButtonGroup
      className={"w-full p-3 bg-diaDarkBlue rounded-t-2xl shadow-md grid grid-cols-5"}
      sx={{
        "& .MuiToggleButtonGroup-root , .MuiButtonBase-root": {
          borderWidth: 2,
          margin: 0,
          padding: 0,
        },
        borderRadius: 0,
      }}
      color="primary"
      exclusive
      aria-label="Platform"
    >
      <ToggleButton className={"h-full w-full border-none"}>
        <Link href={"/app"} className={"w-full h-full flex justify-center py-2 rounded-xl"}>
          <Icon icon="octicon:home-16" className={`h-7 w-7 m-auto text-white`} />
        </Link>
      </ToggleButton>
      <ToggleButton className={"h-full w-full border-none py-2 rounded-xl"}>
        <Link href={"/blog/articles"} className={"w-full h-full flex justify-center"}>
          <Icon icon={"majesticons:article-line"} className={`h-7 w-7 m-auto text-white`} />
        </Link>
      </ToggleButton>
      <ToggleButton className={"relative h-full border-none w-full"}>
        <div className="w-14 h-14 blur-lg bg-diaBlue absolute bottom-0"></div>
        <Link href={"/app/add"} className={"absolute mb-12 bg-diaBlue rounded-full h-16 w-16 flex justify-center"}>
          <Icon icon="ic:round-add" className={`h-10 w-10 m-auto text-white`} />
        </Link>
      </ToggleButton>
      <ToggleButton className={"h-full w-full border-none py-2 rounded-xl"}>
        <Link href={"/dia-kitchen/recipes"} className={"w-full h-full flex justify-center"}>
          <Icon icon={"game-icons:kitchen-scale"} className={`h-7 w-7 m-auto text-white`} />
        </Link>
      </ToggleButton>
      <ToggleButton className={"h-full w-full border-none py-2 rounded-xl"}>
        <Link href={"/app/settings"} className={"w-full h-full flex justify-center"}>
          <Icon icon="iconamoon:profile" className={`h-7 w-7 m-auto text-white`} />
        </Link>
      </ToggleButton>
    </ToggleButtonGroup>
  </footer>
);
