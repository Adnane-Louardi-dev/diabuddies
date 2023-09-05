import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Logo} from "../components/Logo";
import {Button} from "@mui/material";
import {useTranslation} from "next-i18next";
import Container from "@mui/material/Container";


export default function LandingPage() {
    const {t,i18n} = useTranslation()
    return (
        <Container maxWidth={"xl"} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
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