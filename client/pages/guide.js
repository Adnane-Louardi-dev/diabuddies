import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Typography from "@mui/material/Typography";
import React, {useMemo} from "react";
import {Icon} from "@iconify/react";


export default function Guide() {

    const actions = useMemo(()=>{
        return [
            {
                actionType: "dailyLogIn",
                pointsEarned: "5",
                label: "Daily log in 👋",
                description: "Each day you log into the application, earn 5 sugar molecules.",
                icon: "mdi:login"
            },{
                actionType: "addedNewLogBook",
                pointsEarned: "1",
                label: "You added a new logBook 📃",
                description: "Earn a sugar molecule on every logbook you save.",
                icon: "icon-park-outline:log",
            },{
                actionType: "readABlog",
                pointsEarned: "1",
                label: "You have read a blog article 📄",
                description: "Read A blog, educate your self and earn a sugar molecule.",
                icon: "material-symbols:article-outline"
            },{
                actionType: "makeOrder",
                pointsEarned: "15",
                label: "You have bought a product from our store 🎁",
                description: "Make an order from our store and earn 15 sugar molecules",
                icon: "icon-park-outline:ad-product"
            },{
                actionType: "postAComment",
                pointsEarned: "2",
                label: "You commented in a blog article 📝",
                description: "Earn 2 sugar molecules for your first comment in a blog article",
                icon: "material-symbols:comment-outline"
            },{
                actionType: "share",
                pointsEarned: "7",
                label: "You shared us 🥰",
                description: "Share a blog, product or our app, you'll earn 7 sugar molecules",
                icon: "mdi:share-outline"
            },{
                actionType: "setupProfile",
                pointsEarned: "10",
                label: "You have successfully configured your profile 🪪",
                description: "Configured your profile and earn 10 sugar molecules",
                icon: "icomoon-free:profile"
            }
        ]
    },[])

    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <Typography typography={"h4"} className={"my-3"} textAlign={"center"}>Action Logs Guide</Typography>
        {actions.map(({actionType,pointsEarned,label,description,icon}) => (
            <div className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer">
                <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
                    <Icon icon={icon} className={"mx-auto text-white h-8 w-8"} />
                </div>
                <div className="grid gap-2 col-span-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{label}</h4>
                            <p className="font-sourceCode text-diaDarkBlue text-md">{description}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center p-1 w-[200px] text-white rounded-lg bg-diaDarkBlue">
                                <Icon icon="carbon:chemistry" className={"mx-1"} />
                                <span className="font-sourceCode text-xs">Sugar molecules</span>
                                <span className="font-sourceCode font-bold mx-2">
                                    {pointsEarned}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </Container>
}