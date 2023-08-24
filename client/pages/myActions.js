import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";
import LoadingCircle from "../components/loadingCircle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export default function MyActions(){
    const router = useRouter()
    const {data:actions, isLoading,isError} = useQuery(["my-actions"],async ()=>{
        const {data} = await axios.get("/api/gamify/actions")
        return data
    })
    const getActionIcon = React.useCallback((action) =>{
        const actionIcons = {
            "dailyLogIn": "mdi:login",
            "addedNewLogBook": "icon-park-outline:log",
            "readABlog": "material-symbols:article-outline",
            "makeOrder": "icon-park-outline:ad-product",
            "postAComment": "material-symbols:comment-outline",
            "setupProfile": "icomoon-free:profile",
            "share": "mdi:share-outline"
        }
        let actionIcon = actionIcons[action] ?? "healthicons:i-note-action"
        return <Icon icon={actionIcon} className={"mx-auto text-white h-8 w-8"} />
    },[])
    const getActionText = React.useCallback((action) =>{
        const actionTexts = {
            "dailyLogIn": "Daily log in 👋",
            "addedNewLogBook": "You added a new logBook 📃",
            "readABlog": "You have read a blog article 📄",
            "makeOrder": "You have bought a product from our store 🎁",
            "postAComment": "You commented in a blog article 📝",
            "setupProfile": "You have successfully configured your profile 🪪",
            "share":  "You shared us 🥰",
        }
        return actionTexts[action] ?? "You earned some insulin molecules 🎉"
    },[])

    if(isLoading){
        return <LoadingCircle />
    }
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />

        <Typography typography={"h4"} className={"my-3"} textAlign={"center"}>My Action Logs</Typography>

        <div className={"mt-10"}>
            {actions.map(({actionType,pointsEarned}) => (
                <div className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer">
                    <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
                        {getActionIcon(actionType)}
                    </div>
                    <div className="grid gap-2 col-span-5">
                        <div className="flex justify-between items-center">
                            <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{getActionText(actionType)}</h4>
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center p-1 w-[200px] text-white rounded-lg bg-diaDarkBlue">
                                    <Icon icon="carbon:chemistry" className={"mx-1"} />
                                    <span className="font-sourceCode text-xs">Insulin molecules</span>
                                    <span className="font-sourceCode font-bold mx-2">
                                        {pointsEarned}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Container>
}