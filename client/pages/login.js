"use client";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getDir } from "../utils/getDir";

export default function Login() {
  const router = useRouter();
  const { register, control, handleSubmit, reset } = useForm();
  const { t, i18n } = useTranslation("login");
  const onSubmit = (data) => {
    axios
      .post("/api/login/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          router.push("/app");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onErrors = (err) => console.log(err);

  return (
    <div className="overflow-none h-[90vh]" dir={getDir(i18n.language)}>
      {/* <Image src={"/signup_promo.jpg"} className="brightness-50 blur-xs " fill objectFit="cover" alt={"black woman checking blood sugar"} /> */}
      {/* <div className="relative w-screen p-6 text-center">
        {i18n.language !== "ar" && (
          <p className="text-md text-diaGray leading-relaxed font-poppins">
            With <span className="font hover:underline hover:text-diaBlue decoration-diaOrange">DIABUDDIES</span> you can easily control <br />
            and track your diabetes in one single platform.
          </p>
        )}
        {i18n.language === "ar" && (
          <p className="text-md text-diaGray leading-relaxed font-poppins">
            <span>مع </span>
            <span className="font hover:underline hover:text-diaBlue decoration-diaOrange" dir={"rtl"}>
              DIABUDDIES{" "}
            </span>
            <span>يمكنك بسهولة التحكم </span>
            <br />
            ومتابعة مرض السكري في تطبيق واحد
          </p>
        )}
      </div> */}
      <div className="overflow-none grid h-[100vh] bg-[azure] justify-center shadow-lg lg:items-center lg:rounded-none">
        <div className="relative h-0 w-full">
          <div className="relative mx-5">
            <Image src={"/diabuddies_logo.png"} style={{ height: "auto" }} priority height={100} width={175} alt="Diabuddies full logo" className="absolute inset-0" />
          </div>
          <div className="relative px-10 mt-24">
            {i18n.language !== "ar" && (
              <p className="text-md text-diaGray leading-relaxed font-sourceCode">
                Welcome back, <span className="font-semibold hover:underline hover:text-diaBlue">Diabuddy!</span>
              </p>
            )}
            {i18n.language === "ar" && (
              <p className="text-md text-diaGray leading-relaxed font-sourceCode">
                <span>مع </span>
                <span className="font hover:underline hover:text-diaBlue decoration-diaOrange" dir={"rtl"}>
                  DIABUDDIES{" "}
                </span>
                <span>يمكنك بسهولة التحكم </span>
                <br />
                ومتابعة مرض السكري في تطبيق واحد
              </p>
            )}
          </div>
        </div>
        <div className="px-10">
          <div className="my-5 py-5 border-b-2">
            <Link href="/api/login/auth/google" passHref>
              <Button fullWidth variant="outlined" className="my-7 p-3 text-diaDarkBlue bg-white text-md rounded-xl border-none shadow-md">
                <Image src={"/icons/google.png"} height={25} width={25} alt="google icon" />
                <span className="truncate mx-3">{t("googleSignUp")}</span>
              </Button>
            </Link>
            <Link href="/api/login/facebook" passHref>
              <Button fullWidth variant="outlined" className="mb-7 p-3 text-diaDarkBlue bg-white text-md rounded-xl border-none shadow-md">
                <Image src={"/icons/facebook.png"} height={25} width={25} alt="google icon" />
                <span className="truncate mx-3">{t("facebookSignUp")}</span>
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <TextField
              required
              disabled
              sx={{
                "& ::after, & ::before": {
                  display: "none",
                },
                "& input": {
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                },
              }}
              {...register("username")}
              fullWidth
              id="standard-required"
              label={t("username")}
              autoComplete="current-email"
              variant="filled"
              margin="normal"
              className="ring-2 ring-gray-400 rounded-xl shadow-lg opacity-75"
            />
            <TextField
              required
              disabled
              sx={{
                "& ::after, & ::before": {
                  display: "none",
                },
                "& input": {
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                },
              }}
              {...register("password")}
              fullWidth
              id="standard-password-input"
              label={t("password")}
              type="password"
              autoComplete="current-password"
              variant="filled"
              margin="normal"
              className="ring-2 ring-gray-400 rounded-xl shadow-lg opacity-75"
            />
            <Button disabled fullWidth className="mt-14 shadow-md p-3 text-white bg-diaDarkBlue text-md rounded-full opacity-75" variant="outlined" type="submit" margin="normal">
              {t("signIn")}
            </Button>
          </form>
          <h3 className="absolute bottom-5 left-0 right-0 px-3 font-sourceCode font-semibold text-diaGray text-xs mt-5 text-center">
            By siging in you're agreeing The
            <Link href={"https://www.iubenda.com/terms-and-conditions/31841318"} className="text-diaBlue">
              {" "}
              Terms and Conditions
            </Link>
            ,{" "}
            <Link href={"https://www.iubenda.com/privacy-policy/31841318"} className="text-diaBlue">
              Privacy Policy{" "}
            </Link>
            And{" "}
            <Link href={"https://www.iubenda.com/privacy-policy/31841318/cookie-policy"} className="text-diaBlue">
              Cookie Policy
            </Link>
            .
          </h3>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["login"])),
  },
});
