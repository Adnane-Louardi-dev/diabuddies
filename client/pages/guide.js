import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Typography from "@mui/material/Typography";
import React from "react";
import {Icon} from "@iconify/react";
import {actionsLogbook} from "../utils/actionLogbook";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export default function Guide() {
    const {i18n,t} = useTranslation()
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <Typography typography={"h4"} className={"my-3"} textAlign={"center"}>{t("guide")}</Typography>
        {actionsLogbook.map(({labelAr,descriptionAr,pointsEarned,label,description,icon}) => (
            <div key={label} className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
                    <Icon icon={icon} className={"mx-auto text-white h-8 w-8"} />
                </div>
                <div className="grid gap-2 col-span-5">
                    <div className="flex justify-between items-center">
                        {i18n.language !== "ar" && <div>
                            <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{label}</h4>
                            <p className="font-sourceCode text-diaDarkBlue text-md">{description}</p>
                        </div>}
                        {i18n.language === "ar" && <div>
                            <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{labelAr}</h4>
                            <p className="font-sourceCode text-diaDarkBlue text-md">{descriptionAr}</p>
                        </div>}
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center p-1 w-[200px] text-white rounded-lg bg-diaDarkBlue">
                                <Icon icon="carbon:chemistry" className={"mx-1"} />
                                {i18n.language !== "ar" && <span className="font-sourceCode text-xs">Sugar molecules</span>}
                                {i18n.language === "ar" && <span className="font-sourceCode text-xs">جزيء سكر</span>}
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

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common','index']))
    }
});
