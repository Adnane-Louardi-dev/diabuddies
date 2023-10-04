import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "../../components/loadingCircle";
import Container from "@mui/material/Container";
import { Logo } from "../../components/layout/Logo";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Glucose from "../../components/glucose";
import ActiveInsulin from "../../components/activeInsulin";
import { useState } from "react";
import moment from "moment/moment";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LogBookItem from "../../components/logBookItem";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { getDir } from "../../utils/getDir";
import { Icon } from "@iconify/react";
import LineChartGraph from "../../components/charts/lineChartGraph";

export default function UserProfile() {
  const router = useRouter();
  const token = router.query.token;
  const [activeInsulin, setActiveInsulin] = useState(0);
  const [glucose, setGlucose] = useState(120);
  const [lastInjectionTime, setLastInjectionTime] = useState(moment());
  const { t, i18n } = useTranslation("settings");
  const { t: tc } = useTranslation("common");

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["profile", token],
    async () => {
      const { data } = await axios.get(`/api/user/profile/${token}`);
      return data;
    },
    { enabled: router.isReady }
  );
  if (isLoading || isError) {
    <LoadingCircle />;
  }
  if (!user) {
    return <h1>Errore</h1>;
  }
  return (
    <Container maxWidth={"xl"} dir={getDir(i18n.language)}>
      <div className={"flex justify-between"} dir={"ltr"}>
        <Logo />
        <div className={"flex mt-3"}>
          <Avatar alt="Profile photo" src={user.photo} className="h-12 w-12" />
          <div className={"ml-5 h-12 relative w-[150px]"}>
            <div className={"absolute left-0 top-[50%] translate-y-[-50%]"}>
              <p>
                {user.givenName} {user.familyName}
              </p>
              {user.diabeticDetails.diabetesType !== "diabetecType" && <p>{tc(user.diabeticDetails.diabetesType)}</p>}
            </div>
          </div>
        </div>
      </div>
      <section className="shadow-2xl p-4 bg-white rounded-2xl my-8">
        <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
          <div className="flex justify-between text-diaGray items-center">
            <h3 className="text-lg font-semibold font-rubik">{tc("glucose")}</h3>
            <Icon icon="ph:info" className="mx-3" />
          </div>
          <div className="my-3 bg-white rounded-xl pr-3">
            {/* //reverse the graph to show the recent egvs from RTL */}
            <LineChartGraph props={user.recentLogBooks.reverse()} />
          </div>
        </section>
      </section>
      <Typography variant={"h5"} className={"my-4"}>
        {tc("recentLogs")}
      </Typography>
      {user.recentLogBooks.length > 0 ? (
        <>
          {user.recentLogBooks.map((log) => {
            return <LogBookItem props={log} key={log._id} />;
          })}
        </>
      ) : (
        <div className="grid items-center text-center justify-center m-3 py-5 bg-white rounded-xl">
          <Image
            src={"/No-data-cuate.webp"}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
            height={300}
            width={200}
            alt="no data in blue folder"
          />
          <h2 className={"text-xl font-poppins text-gray-900 font-semibold"}>Oops!</h2>
          <p className={"font-poppins text-sm text-gray-900"}>
            {user.givenName} {user.familyName} {tc("didNotLog")}
          </p>
        </div>
      )}

      <section className={"shadow-2xl p-4 bg-white rounded-2xl my-8"}>
        <Typography variant={"h5"} className={"my-4"}>
          {tc("diabeticDetails")}
        </Typography>
        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
          {user.diabeticDetails.height.value && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{tc("height")}: </p>
              <p className={"px-2"}>
                {user.diabeticDetails.height.value} {tc(user.diabeticDetails.height.unit)}
              </p>
            </div>
          )}
          {user.diabeticDetails.weight.value && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{tc("weight")}:</p>
              <p className={"px-2"}>
                {user.diabeticDetails.weight.value} {tc(user.diabeticDetails.weight.unit)}
              </p>
            </div>
          )}
          {user.diabeticDetails.insulinSensitivity.value && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("insulinSensitivity")}:</p>
              <p className={"px-2"}>
                {user.diabeticDetails.insulinSensitivity.value} {tc(user.diabeticDetails.insulinSensitivity.unit)}
              </p>
            </div>
          )}
          {user.diabeticDetails.hb1ac && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>HB1AC:</p>
              <p className={"px-2"}>{user.diabeticDetails.hb1ac} IFCC</p>
            </div>
          )}
          {user.diabeticDetails.hyperglycemia && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("hyperglycemia")}:</p>
              <p className={"px-2"}>
                {tc("min")} <br className={`${i18n.language === "ar" ? "block" : "hidden"} md:hidden`} /> {user.diabeticDetails.hyperglycemia.min} {tc(user.diabeticDetails.unit)}
                <br />
                {tc("max")} <br className={`${i18n.language === "ar" ? "block" : "hidden"} md:hidden`} /> {user.diabeticDetails.hyperglycemia.max} {tc(user.diabeticDetails.unit)}
              </p>
            </div>
          )}
          {user.diabeticDetails.normalBloodGlucose && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("normalBloodGlugose")}:</p>
              <p className={"px-2"}>
                {tc("min")} <br className={`${i18n.language === "ar" ? "block" : "hidden"} md:hidden`} /> {user.diabeticDetails.normalBloodGlucose.min} {tc(user.diabeticDetails.unit)}
                <br />
                {tc("max")} <br className={`${i18n.language === "ar" ? "block" : "hidden"} md:hidden`} /> {user.diabeticDetails.normalBloodGlucose.max} {tc(user.diabeticDetails.unit)}
              </p>
            </div>
          )}
          {user.diabeticDetails.hypoglycemia && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("hypoglycemia")}:</p>
              <p className={"px-2"}>
                {tc("min")} <br className={`${i18n.language === "ar" ? "block" : "hidden"} md:hidden`} /> {user.diabeticDetails.hypoglycemia.min} {tc(user.diabeticDetails.unit)}
                <br />
                {tc("max")} <br className={`${i18n.language === "ar" ? "block" : "hidden"} md:hidden`} /> {user.diabeticDetails.hypoglycemia.max} {tc(user.diabeticDetails.unit)}
              </p>
            </div>
          )}
          {user.diabeticDetails.bodyFatPercentage && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("bodyFatPercentage")}:</p>
              <p className={"px-2"}>{user.diabeticDetails.bodyFatPercentage}%</p>
            </div>
          )}
          {user.diabeticDetails.carbsRatio && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("carbsRatio")}:</p>
              <p className={"px-2"}>{user.diabeticDetails.carbsRatio}%</p>
            </div>
          )}
          {user.diabeticDetails.dailyCaloriesNeeds && (
            <div className={"flex justify-between"}>
              <p className={"text-diaBlue"}>{t("dailyCaloriesNeeds")}:</p>
              <p className={"px-2"}>
                {user.diabeticDetails.dailyCaloriesNeeds} {tc("kcal")}
              </p>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "index", "settings"])),
  },
});
