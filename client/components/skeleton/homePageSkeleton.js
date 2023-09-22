import {Logo} from "../Logo";
import Container from "@mui/material/Container";
import {LogoLoading} from "../LogoLoading";


export const HomePageSkeleton = () => <Container maxWidth={"xl"} className={"relative w-screen h-screen"}>
    <div role={"status"}>
        <div className={"flex justify-between mt-5"}>
            <Logo />
            <div className={"animate-pulse w-14 h-14 bg-gray-300 rounded-full dark:bg-gray-700"} />
        </div>
        <div className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"}>
            <LogoLoading />
        </div>
    </div>
</Container>