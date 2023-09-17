import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Typography from "@mui/material/Typography";
import React from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Icon} from "@iconify/react";
import {t} from "i18next";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export default function Leaderboard() {
    const {t} = useTranslation()
    const {data:leaderBoardPeople, isLoading } = useQuery(["leaderBoard"],async ()=>{
        const {data} = await axios.get("/api/gamify/leaderboard")
        return data
    })

    console.log("leaderBoardPeople", leaderBoardPeople)

    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <Typography typography={"h4"} className={"my-3"} textAlign={"center"}>{t("leaderboard")}</Typography>

        {!isLoading && <section>
            {leaderBoardPeople.map(({user,points,level},index)=> <article
                className={"grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-b-2 border-diaDarkBlue bg-white"}
                key={"leaderBoardPerson:"+index}>
                    <div className="self-start col-span-1 flex items-center">
                        {index === 0 &&  <span className={"font-bold text-[#ffad00]"}>
                            {index + 1}
                        </span>}
                        {index === 1 && <span className={"font-bold text-[#c0c0c0]"}>
                            {index + 1}
                        </span>}
                        {index === 2 && <span className={"font-bold text-[#b36700]"}>
                            {index + 1}
                        </span>}
                        {index > 2 && <span>
                            {index + 1}
                        </span>}
                        <img src={user.photo} className={"mx-auto rounded-full h-12 w-12"} />
                    </div>
                    <div className="grid gap-2 col-span-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{user.givenName} {user.familyName}</h4>
                                {level && <p className="font-sourceCode text-diaDarkBlue text-md">{level.levelName}</p>}
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center p-1 w-[100px] text-diaDarkBlue rounded-lg">
                                    <span className="font-sourceCode font-bold mx-2">
                                        {points}
                                    </span>
                                    <Icon icon="carbon:chemistry" className={"mx-1"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>)}
        </section>}
    </Container>
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});
