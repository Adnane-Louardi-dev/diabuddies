import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import ResponsiveAppBar from "../../components/layout/ResponsiveAppBar";
import Glucose from "../../components/glucose";
import ActiveInsulin from "../../components/activeInsulin";
import LogBookItem from "../../components/logBookItem";
import LineChartGraph from "../../components/charts/lineChartGraph";
import PiGraph from "../../components/charts/piGraph";
import BarGraph from "../../components/charts/barGraph";
import DayPicker from "../../components/dayPicker";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { useGetCurrentUser } from "../../customeHooks/useGetCurrentUser";
import CompleteYourProfile from "../../components/completeYourProfile";
import { SmallArticle } from "../../components/blog/smallArticle";
import Card from "../../components/store/card";
import BolusAdvisor from "../../components/bolusAdvisor";
import { Button } from "@mui/material";
import Advice from "../../components/advice";
import { GamifyProgressBar } from "../../components/appBar/GamifyProgressBar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getDir } from "../../utils/getDir";
import Container from "@mui/material/Container";
import withAuth from "../../components/layout/withAuth";
import { useHomeArticles, useHomeProducts, useIndexCharts } from "../../customeHooks/useHomePage";
import { HomePageSkeleton } from "../../components/skeleton/homePageSkeleton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function Home() {
  const router = useRouter();
  const [date, setDate] = useState(router.query.date || moment().format("L"));
  const [activeInsulin, setActiveInsulin] = useState(0);
  const [glucose, setGlucose] = useState(120);
  const [lastInjectionTime, setLastInjectionTime] = useState(moment());
  const { t, i18n } = useTranslation("index");
  const { t: tc } = useTranslation("common");

  //GET method to get user info
  const { user, isLoading: isUserLoading } = useGetCurrentUser();
  const { data: articles, isLoading: isArticlesLoading } = useHomeArticles();
  const { data: products, isLoading: isProductsLoading } = useHomeProducts();
  const { data: Data, isLoading, refetch } = useIndexCharts(date);

  useEffect(() => {
    if (!isUserLoading && router.isReady && user?.newUser) {
      router.push("/app/setup");
    }
    refetch();
    console.log(Data);
  }, [isUserLoading, router.isReady, date]);

  const userGreeting = useMemo(() => {
    if (!isUserLoading && user) {
      const timeNow = moment().format("LT");
      if (timeNow >= moment("12:00 AM", "LT") && timeNow < moment("12:00 PM")) {
        return `${i18n.language !== "ar" ? "Good morning" : "صباح الخير"}, ${user.givenName}`;
      }
      if (timeNow >= moment("12:00 PM", "LT") && timeNow < moment("05:00 PM")) {
        return `${i18n.language !== "ar" ? "Good afternoon" : "مساء الخير"}, ${user.givenName}`;
      }
      if (timeNow >= moment("05:00 PM", "LT") && timeNow < moment("09:00 PM")) {
        return `${i18n.language !== "ar" ? "Good evening" : "مساء الخير"}, ${user.givenName}`;
      }
      return `${i18n.language !== "ar" ? "Good night" : "تصبح على خير"}, ${user.givenName}`;
    }
    return `${i18n.language !== "ar" ? "Good morning" : "صباح الخير"}`;
  }, [isUserLoading, i18n.language]);

  return (
    <>
      <Head lang={i18n.language}>
        <meta name="title" content="Diabuddies | All-in-One Solution for Diabetes Management" />
        <meta name="language" content={i18n.language === "ar" ? "Arabic" : "English"} />
        <title>Home | Diabuddies</title>
      </Head>
      {!isLoading && !isUserLoading && user ? (
        <>
          <ResponsiveAppBar />
          <main className="p-4 relative overflow-y-hidden" dir={getDir(i18n.language)}>
            <span className="font-inter text-2xl text-semibold">{userGreeting}</span>
            {user.newUser ? <CompleteYourProfile /> : null}
            <DayPicker setDate={setDate} date={date} />
            <GamifyProgressBar />
            {Data?.logBook[0] && (
              <>
                <section className="flex justify-around my-5">
                  <Glucose props={[...Data?.logBook].reverse()} setGlucose={setGlucose} />
                  <ActiveInsulin props={Data?.logBook} activeInsulin={activeInsulin} setActiveInsulin={setActiveInsulin} lastInjectionTime={lastInjectionTime} setlastInjectionTime={setLastInjectionTime} />
                </section>
              </>
            )}
            <div className="flex snap-x snap-mandatory px-3 w-full overflow-x-scroll no-scrollbar">
              <div className="snap-center mr-1 w-full shrink-0">
                <BolusAdvisor activeInsulin={activeInsulin} glucose={glucose} lastInjectionTime={lastInjectionTime} />
              </div>
              <div className="snap-center mr-1 w-full shrink-0">
                <div className="flex content-end justify-center p-5 h-full w-full">
                  <div className="flex relative w-full p-5">
                    <Image src={"/buy_our_products.png"} alt={"image_diabuddies"} layout="fill" objectFit="cover" />
                    <div className="self-end">
                      <Button variant="filled" className="flex mt-3 text-diaBlue text-xl font-poppins bg-white pt-2 rounded-full shadow-md">
                        Buy our products
                      </Button>
                    </div>
                  </div>
                  {/* <h2 className="font-sourceCode text-2xl font-semibold text-white">{t("hero_text")}</h2> */}
                </div>{" "}
              </div>
              <div className="snap-center mr-1 w-full shrink-0">
                <BolusAdvisor activeInsulin={activeInsulin} glucose={glucose} lastInjectionTime={lastInjectionTime} />
              </div>
            </div>
            <div className="flex justify-between items-center my-5">
              <div className="flex items-center">
                <div className="ring-1 ring-gray-300 p-1 rounded-md mx-3">
                  <Icon icon="bi:book" className={`h-5 w-5 text-diaGray`} />
                </div>
                <h3 className="text-lg text-diaGray font-semibold font-rubik">{tc("recently")}</h3>
              </div>
              <Button
                variant="filled"
                onClick={() => {
                  router.push("/app/add");
                }}
                className="flex justify-between items-center text-diaBlue bg-diaBlue bg-opacity-25 pt-2 rounded-full shadow-md"
              >
                {tc("add")}
                <Icon icon="material-symbols:add-circle-rounded" className="mx-1 mb-0.5" />
              </Button>
              {/* <NewLogDialog /> */}
            </div>
            <section className="w-full h-96 overflow-scroll no-scrollbar mb-8 shadow-lg bg-white rounded-2xl px-2 py-6">
              {Data.logBook[0] ? (
                <>
                  {Data.logBook.map((log) => {
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
                  <p className={"font-poppins text-sm text-gray-900"}>{t("logNotFound")}</p>
                </div>
              )}
            </section>
            <Advice />
            {Data.graphData ? (
              <>
                <div className="flex justify-between items-center my-5">
                  <div className="flex items-center">
                    <div className="ring-1 ring-gray-300 p-1 rounded-md mx-3">
                      <Icon icon="ic:round-bar-chart" className="h-5 w-5 text-diaGray" />
                    </div>
                    <h3 className="text-lg text-diaGray font-semibold font-rubik">{tc("charts")}</h3>
                  </div>
                  <Link href={"/app/charts"} aria-label="Charts page" passHref>
                    <Icon icon="ep:arrow-right-bold" className={`h-6 w-6 text-diaGray ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                  </Link>
                </div>
                <section className="shadow-2xl p-4 bg-white rounded-2xl mb-8">
                  <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                    <div className="flex justify-between text-diaGray items-center">
                      <h3 className="text-lg font-semibold font-rubik">{tc("glucose")}</h3>
                      <Icon icon="ph:info" className="mx-3" />
                    </div>
                    <div className="my-3 bg-white rounded-xl pr-3">
                      {/* //reverse the graph to show the recent egvs from RTL */}
                      <LineChartGraph props={[...Data.graphData.egvs].reverse()} />
                    </div>
                  </section>
                  <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                    <div className="flex justify-between text-diaGray items-center">
                      <h3 className="text-lg font-semibold font-rubik">{t("glucose_distibution")}</h3>
                      <Icon icon="ph:info" className="mx-3" />
                    </div>
                    <div className="my-3 bg-white rounded-xl">
                      <PiGraph props={Data.graphData.egvs} />
                    </div>
                  </section>
                  <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                    <div className="flex justify-between text-diaGray items-center">
                      <h3 className="text-lg font-semibold font-rubik truncate">{t("per_meal_chart")}</h3>
                      <Icon icon="ph:info" className="mx-3" />
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-xl w-full">
                      <BarGraph props={[...Data.logBook].reverse()} />
                    </div>
                  </section>
                </section>
                {!isArticlesLoading && (
                  <section>
                    <div className={"flex justify-between items-center my-5"}>
                      <div className="flex items-center">
                        <div className="ring-1 ring-gray-300 p-1 rounded-md mx-3">
                          <Icon icon="majesticons:article-line" className={`h-7 w-7 text-diaGray`} />
                        </div>
                        <h3 className="text-lg text-diaGray font-semibold font-rubik">Dia-Blog</h3>
                      </div>
                      <Link href={"/blog/articles"} className={"flex text-diaGray"} aria-label="Charts page" passHref>
                        <h4>{t("read_more_articles")}</h4>
                        <Icon icon="ep:arrow-right-bold" className={`h-6 w-6 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                    <div className={"shadow-2xl p-4 bg-white rounded-2xl mb-8 pb-8"}>
                      <Container maxWidth={"xl"}>
                        <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {articles?.data?.map(({ id, attributes }) => (
                            <SmallArticle {...attributes} id={id} key={id} horizental={false} />
                          ))}
                        </div>
                      </Container>
                    </div>
                  </section>
                )}
                {!isProductsLoading && (
                  <section>
                    <div className={"flex justify-between items-center my-5"}>
                      <div className="flex items-center">
                        <div className="ring-1 ring-gray-300 p-1 rounded-md mx-3">
                          <Icon icon="iconamoon:store-light" className={`h-7 w-7 text-diaGray`} />
                        </div>
                        <h3 className="text-lg text-diaGray font-semibold font-rubik ">E-Diabuddies</h3>
                      </div>
                      <Link href={"/store"} className={"flex text-diaGray"} aria-label="Charts page" passHref>
                        <h4>{t("explore_products")}</h4>
                        <Icon icon="ep:arrow-right-bold" className={`h-6 w-6 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                    <div className={"shadow-2xl p-4 bg-white rounded-2xl mb-8 pb-8"}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products?.map((product) => (
                          <Card product={product} key={product.id} />
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </>
            ) : null}
          </main>
        </>
      ) : (
        <HomePageSkeleton />
      )}
    </>
  );
}

export default withAuth(Home);
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "index"])),
  },
});
