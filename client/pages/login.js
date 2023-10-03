'use client'
import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getDir} from "../utils/getDir";

export default function Login() {
  const router = useRouter();
  const { register, control, handleSubmit, reset } = useForm();
  const {t,i18n} = useTranslation("login")
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
    <div className="h-full h-screen" dir={getDir(i18n.language)}>
      {/* <Image src={"/signup_promo.jpg"} className="brightness-50 blur-xs " fill objectFit="cover" alt={"black woman checking blood sugar"} /> */}
      <div className="relative h-52 w-screen pt-8 px-6 text-center">
        {i18n.language !== "ar" && <p className="text-md text-diaGray leading-relaxed font-poppins">
          With <span className="font hover:underline hover:text-diaBlue decoration-diaOrange">DIABUDDIES</span> you can
          easily control <br/>
          and track your diabetes in one single platform.
        </p>}
        {i18n.language === "ar" && <p className="text-md text-diaGray leading-relaxed font-poppins" >
          <span>مع </span>
          <span className="font hover:underline hover:text-diaBlue decoration-diaOrange" dir={"rtl"}>DIABUDDIES </span>
          <span>يمكنك بسهولة التحكم </span><br/>
          ومتابعة مرض السكري في تطبيق واحد
        </p>}
      </div>
      <div className="flex flex-row -mt-12 bg-white justify-center lg:items-center h-full w-full rounded-3xl lg:rounded-none">
        <div className="absolute">
          <Image src={"/diabuddies_logo.png"} style={{ height: "auto" }} priority height={100} width={250} alt="Diabuddies full logo" />
        </div>
        <div className="flex-none w-full lg:basis-2/5 my-28">
          <div className="my-5 p-10">
            <div className="mb-5 pb-5 border-b-2">
              <Link href="/api/login/auth/google" passHref>
                <Button fullWidth variant="outlined" className="mb-7 p-2 text-diaGray text-md rounded-full border-2 border-diaGray">
                  <GoogleIcon className="text-md mx-5" />
                  {t("googleSignUp")}
                </Button>
              </Link>
              <Link href="/api/login/auth/facebook" passHref>
                <Button fullWidth variant="outlined" className="mb-7 p-2 text-diaGray text-md rounded-full border-2 border-diaGray">
                  <FacebookIcon className="text-md mx-5" />
                  {t("facebookSignUp")}
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              <TextField
                required
                InputLabelProps={{
                  style: {
                    fontSize: 16,
                    backgroundColor: "transparent",
                    color: "#666666",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: 16,
                    backgroundColor: "transparent",
                  },
                }}
                {...register("username")}
                fullWidth
                id="standard-required"
                label={t("username")}
                variant="standard"
                margin="normal"
              />
              <TextField
                required
                InputLabelProps={{
                  style: {
                    fontSize: 16,
                    backgroundColor: "transparent",
                    color: "#666666",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: 16,
                    backgroundColor: "transparent",
                  },
                }}
                {...register("password")}
                fullWidth
                id="standard-password-input"
                label={t("password")}
                type="password"
                autoComplete="current-password"
                variant="standard"
                margin="normal"
              />
              <Button
                fullWidth
                className="my-10 p-2 text-diaGray text-md rounded-full border-2 border-diaGray"
                variant="outlined"
                type="submit"
                margin="normal"
              >
                {t("signIn")}
              </Button>
            </form>
          </div>
        </div>
        {/* <div className="hidden relative lg:flex flex-1 justify-center rounded-lg shadow-2xl w-full h-full lg:basis-1/5">
          <div className="absolute backdrop-blur-lg rounded-3xl shadow-2xl my-20 p-8 z-50">
            <h2 className="mb-8 font-inter text-4xl font-semibold leading-relaxed tracking-wider text-white">
              Let's put some control <br /> on your diabetes together.
            </h2>
            <p className="text-lg text-white font-inter">
              With <span className="font-semibold hover:underline hover:text-diaBlue decoration-diaOrange">DIABUDDIES</span> you can easily control <br />
              and track your diabetes in one single platform.
            </p>

            <Button endIcon={<EastIcon />} className="my-8 font-rubik text-white hover:text-diaOrange text-xl underline hover:decoration-diaOrange">
              Discover why and how
            </Button>
          </div>
          <Image src={"/signup_promo.jpg"} className="brightness-50" fill alt={"black woman checking blood sugar"} />
        </div> */}
      </div>
    </div>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['login']))
  }
});