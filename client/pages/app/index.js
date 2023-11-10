import * as React from "react";
import { useEffect, useMemo, useState } from "react";
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
import {useHomeArticles, useHomeProducts, useIndexCharts} from "../../customeHooks/useHomePage";
import { HomePageSkeleton } from "../../components/skeleton/homePageSkeleton";
import {RecipeComponent} from "../../components/dia-kitchen/recipeComponent";
import {useGetRecipes} from "../../customeHooks/useKitchen";
import qs from "qs";

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
  const { data: recipes, isLoading: isRecipesLoading } = useGetRecipes(qs.stringify({
    pagination: {
      page: 0,
      pageSize: 3
    }
  }));
  const { data: products, isLoading: isProductsLoading } = useHomeProducts();
  const { data: chartData, isLoading, refetch } = useIndexCharts(date);

  useEffect(() => {
    if (!isUserLoading && router.isReady && user?.newUser) {
      router.push("/app/setup");
    }
    refetch();
  }, [isUserLoading, router.isReady, date]);

  const userGreeting = useMemo(() => {
    if (!isUserLoading && user) {
      const timeNow = moment().format("LT");
      console.log(timeNow)
      if (moment(timeNow,"LT") >= moment("12:00 AM", "LT") && moment(timeNow,"LT") < moment("12:00 PM","LT")) {
        return `${i18n.language !== "ar" ? "Good morning" : "صباح الخير"}, ${user.givenName}`;
      }
      if (moment(timeNow,"LT") >= moment("12:00 PM", "LT") && moment(timeNow,"LT") < ("05:00 PM")) {
        return `${i18n.language !== "ar" ? "Good afternoon" : "مساء الخير"}, ${user.givenName}`;
      }
      if (moment(timeNow,"LT") >= moment("05:00 PM", "LT") && moment(timeNow,"LT") < ("09:00 PM")) {
        return `${i18n.language !== "ar" ? "Good evening" : "مساء الخير"}, ${user.givenName}`;
      }
      return `${i18n.language !== "ar" ? "Good night" : "تصبح على خير"}, ${user.givenName}`;
    }
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
            <span className="font-tajawal text-diaDarkBlue text-3xl font-semibold">{userGreeting}</span>
            {user.newUser ? <CompleteYourProfile /> : null}
            <DayPicker setDate={setDate} date={date} />
            <GamifyProgressBar />
            {chartData?.logBooks.length > 0 && (
              <>
                <section className="flex justify-around my-5">
                  <Glucose logs={chartData.logBooks} setGlucose={setGlucose} />
                  <ActiveInsulin logs={chartData.logBooks} activeInsulin={activeInsulin} setActiveInsulin={setActiveInsulin} lastInjectionTime={lastInjectionTime} setlastInjectionTime={setLastInjectionTime} />
                </section>
              </>
            )}
            <div className="flex snap-x snap-mandatory px-3 w-full overflow-x-scroll no-scrollbar">
              <div className="snap-center mr-2 w-full shrink-0">
                <BolusAdvisor activeInsulin={activeInsulin} glucose={glucose} lastInjectionTime={lastInjectionTime} />
              </div>
              <div className="snap-center mr-2 w-full shrink-0">
                <div className="flex content-end justify-center my-5 h-48 w-full rounded-3xl">
                  <div className="relative flex content-end justify-start p-5 h-full w-full">
                    <Image src={"/buy_our_products.png"} alt={"image_diabuddies"} layout="fill" objectFit="cover" className="absolute top-0 left-0 bottom-0 right-0 rounded-3xl ring-2 ring-diaBlue" />
                    <div className="self-end">
                      <Link href={"/store"}>
                        <Button variant="filled" className="flex mb-1 text-diaBlue text-md font-rubik bg-white pt-2 rounded-xl shadow-md">
                          Buy our products
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center my-3">
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
            <section className="w-full max-h-72 overflow-y-scroll no-scrollbar mb-8 shadow-lg bg-white rounded-2xl px-2 py-6">
              {chartData.logBooks.length > 0 ? (
                <>
                  {chartData.logBooks.map((log) => {
                    return <LogBookItem log={log} key={log._id} />;
                  })}
                </>
              ) : (
                <div className="grid items-center text-center justify-center m-3 py-5 bg-white rounded-xl">
                  <Image src={"/No-data-cuate.webp"} priority height={400} width={200} alt="no data in blue folder" />
                  <h2 className={"text-xl font-poppins text-gray-900 font-semibold"}>Oops!</h2>
                  <p className={"font-poppins text-sm text-gray-900"}>{t("logNotFound")}</p>
                  <Link href={"/app/add"} className={"text-diaBlue"}>
                    Add Your First One Today
                  </Link>
                </div>
              )}
            </section>
            <Advice />
              <>
                <div className="flex justify-between items-center mt-8 mb-5">
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
                  {chartData.logBooks[0] ? (
                      <section className="shadow-2xl p-4 bg-white rounded-2xl mb-8">
                          <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                              <div className="flex justify-between p-1 text-diaGray items-center">
                                  <h3 className="text-lg font-semibold font-rubik">{tc("glucose")}</h3>
                                  <Icon icon="ph:info" className="mx-3" />
                              </div>
                              <div className="my-3 bg-white rounded-xl pr-3">
                                  {/* //reverse the graph to show the recent egvs from RTL */}
                                  <LineChartGraph props={[...chartData.logBooks].reverse()} />
                              </div>
                          </section>
                          <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                              <div className="flex justify-between p-1 text-diaGray items-center">
                                  <h3 className="text-lg font-semibold font-rubik">{t("glucose_distibution")}</h3>
                                  <Icon icon="ph:info" className="mx-3" />
                              </div>
                              <div className="my-3 bg-white rounded-xl">
                                  <PiGraph props={chartData.logBooks} />
                              </div>
                          </section>
                          <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                              <div className="flex justify-between p-1 text-diaGray items-center">
                                  <h3 className="text-lg font-semibold font-rubik truncate">{t("per_meal_chart")}</h3>
                                  <Icon icon="ph:info" className="mx-3" />
                              </div>
                              <div className="flex items-center justify-center bg-white rounded-xl w-full">
                                  <BarGraph props={chartData.logBooks.reverse()} />
                              </div>
                          </section>
                      </section>
                  ) : (
                      <div className="grid items-center justify-center shadow-2xl px-4 py-10 bg-white rounded-2xl mb-8 text-center">
                          <Image src={"/no_graph_found.png"} height={150} width={150} alt="no diabuddies graph data found" />
                          <h3 className="font-rubik font-semibold text-xl text-diaDarkBlue mt-5">No Graph Data Yet</h3>
                          <p className="font-rubik font-sm text-diaGray">
                              Try to{" "}
                              <Link passHref href={"/app/add"} className="text-diaBlue">
                                  add a log
                              </Link>{" "}
                          </p>
                      </div>
                  )}
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
                {!isRecipesLoading && (
                  <section>
                    <div className={"flex justify-between items-center my-5"}>
                      <div className="flex items-center">
                        <div className="ring-1 ring-gray-300 p-1 rounded-md mx-3">
                          <Icon icon="game-icons:kitchen-scale" className={`h-7 w-7 text-diaGray`} />
                        </div>
                        <h3 className="text-lg text-diaGray font-semibold font-rubik">Dia-Kitchen</h3>
                      </div>
                      <Link href={"/blog/articles"} className={"flex text-diaGray"} aria-label="Charts page" passHref>
                        <h4>{t("explore-more-recipes")}</h4>
                        <Icon icon="ep:arrow-right-bold" className={`h-6 w-6 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                    <div className={"shadow-2xl p-4 bg-white rounded-2xl mb-8 pb-8"}>
                      <Container maxWidth={"xl"}>
                        <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {recipes?.map(({ id, attributes }) => (
                            <RecipeComponent recipe={attributes} id={id} key={id}/>
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
