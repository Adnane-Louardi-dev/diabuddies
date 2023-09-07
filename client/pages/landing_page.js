import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Logo} from "../components/Logo";
import {Button} from "@mui/material";
import {useTranslation} from "next-i18next";
import Container from "@mui/material/Container";
import LanguageSwitcher from "../components/appBar/LanguageSwitcher";
import {getDir} from "../utils/getDir";

export default function LandingPage() {
    const {t,i18n} = useTranslation("landingPage")

    return (
        <Container maxWidth={"xl"} dir={getDir(i18n.language)}>
            <LanguageSwitcher lang={i18n.language}/>
            <header>
                <nav className={"flex justify-between align-middle"}>
                    <Logo />
                    <div className={"mt-5"}>
                        <Button className={"border-2 border-solid border-diaDarkBlue text-diaDarkBlue rounded-md capitalize mx-3 px-5"}>
                            {t("logIn")}
                        </Button>
                        <Button className={"border-2 border-solid border-transparent bg-diaDarkBlue text-white rounded-md capitalize mx-3 px-5"}>
                            {t("register")}
                        </Button>
                    </div>
                </nav>
            </header>
            <main>
                <div className={"flex gap-4 justify-between items-center h-[calc(100vh-150px)]"}>
                    <div className={"w-1/2 h-full p-2 relative"}>
                        <div className={"absolute top-[40%] translate-y-[-50%]"}>
                            <h3 className={"text-4xl text-diaDarkBlue font-bold mb-10"}>{t("hero_text_title")}</h3>
                            <div className={"[&>ul]:list-disc"} dangerouslySetInnerHTML={{__html: t("hero_text_decription")}}/>
                        </div>
                    </div>
                    <div className={"w-1/2 h-full p-2"}>
                       <img className={i18n.language !== "ar" ? "scale-x-[-1]" : ""} src={`${i18n.language !== "ar" ? "." : ".."}/landing-page-illustrations/hero-section.png`} alt={"hero section image"}/>
                    </div>
                </div>
                <div className={"flex"}>
                    <div className={"w-1/2 h-full"} />
                    <div className={"w-1/2"} dangerouslySetInnerHTML={{__html: t("logbook_pros").split("\n").join("<br>")}} />
                </div>
                <div className={"flex"}>
                    <div className={"w-1/2"} dangerouslySetInnerHTML={{__html: t("blog_pros").split("\n").join("<br>")}} />
                    <div className={"w-1/2 h-full"} />
                </div>
                <div className={"flex"}>
                    <div className={"w-1/2 h-full"} />
                    <div className={"w-1/2"} dangerouslySetInnerHTML={{__html: t("store_pros").split("\n").join("<br>")}} />
                </div>
                <div className={"flex"}>
                    <div className={"w-1/2"} dangerouslySetInnerHTML={{__html: t("newsletter_pros").split("\n").join("<br>")}} />
                    <div className={"w-1/2 h-full"} />
                </div>

            </main>
            <footer>

            </footer>
        </Container>
    )
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['landingPage']))
    }
});