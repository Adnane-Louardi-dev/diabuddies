import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import React, {useMemo} from "react";
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";
import LoadingCircle from "../components/loadingCircle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {actionsLogbook} from "../utils/actionLogbook";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export default function MyActions(){
    const router = useRouter()
    const {i18n,t} = useTranslation()
    const {data:actions, isLoading,isError} = useQuery(["my-actions"],async ()=>{
        const {data} = await axios.get("/api/gamify/actions")
        return data
    })

    const myActions = useMemo(()=>{
        return !actions ? [] : actions.map(action => ({
                ...{label: "You earned some insulin molecules 🎉", icon: "healthicons:i-note-action"},
                ...actionsLogbook.find(actionLogbook => actionLogbook.actionType === action.actionType),
                pointsEarned: action.pointsEarned
            })
        )
    },[actions])

    if(isLoading){
        return <LoadingCircle />
    }
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />

        <Typography typography={"h4"} className={"my-3"} textAlign={"center"}>{t("my_actions")}</Typography>

        <div className={"mt-10"}>
            {myActions.map(({pointsEarned,label,labelAr,icon}) => (
                <div key={label} className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer">
                    <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
                        <Icon icon={icon} className={"mx-auto text-white h-8 w-8"} />
                    </div>
                    <div className="grid gap-2 col-span-5">
                        <div className="flex justify-between items-center">
                            {i18n.language !== "ar" && <div>
                                <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{label}</h4>
                            </div>}
                            {i18n.language === "ar" && <div>
                                <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{labelAr}</h4>
                            </div>}
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
        </div>
    </Container>
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common','index']))
    }
});
