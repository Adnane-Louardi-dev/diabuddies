import React, { useEffect, useState } from "react";
import DateToggleBtn from "../../components/dateToggleBtn";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import LineChartGraph from "../../components/charts/lineChartGraph";
import PiGraph from "../../components/charts/piGraph";
import BarGraph from "../../components/charts/barGraph";
import LoadingCircle from "../../components/loadingCircle";
import ResponsiveAppBar from "../../components/layout/ResponsiveAppBar";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../customeHooks/useGetCurrentUser";
import InsulinDailyTotalsChart from "../../components/charts/insulinDailyTotalsChart";
import MacrosAndKcalChart from "../../components/charts/macrosAndKcalChart";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import withAuth from "../../components/layout/withAuth";
import {GraphSkeleton} from "../../components/skeleton/graphSkeleton";

function Charts() {
  const router = useRouter();
  const [toDate, setToDate] = useState(moment().format("DD/MM/YYYY"));
  const [fromDate, setFromDate] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const {t} = useTranslation("index")
  const {t:tc} = useTranslation()
  const { user, isLoading: isUserLoading } = useGetCurrentUser();
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const result = await axios.get(`/api/charts?from=${fromDate}&to=${toDate}`, { withCredentials: true });
      return result.data;
    },
    onSuccess: () => {
      router.push({ href: "/app/charts", query: { from: fromDate, to: toDate } });
    }
  });
  useEffect(() => {
    refetch();
  }, [fromDate, toDate]);

  if (error) {
    return <>Error message here or in a toast //TODO</>;
  }

  return (
        <>
          <ResponsiveAppBar />
          <div className="py-2 mb-4">
            <div className="flex justify-between items-center">
              <Link href="/app/?date=" passHref>
                <Icon icon="ep:arrow-left-bold" className="h-7 w-7 text-gray-500 mx-4" />
              </Link>
              <div className="w-full flex justify-end">
                <Button variant="outlined" className="flex self-end justify-between mx-5 py-1 items-center text-diaGray rounded-full border-diaGray">
                  <Icon icon="bxs:file-pdf" className="h-7 w-7 mr-2" />
                  <span className="font-codeSource">{tc("export")}</span>
                </Button>
              </div>
            </div>
          </div>
          {/* line chart graph */}
          <Grid container rowSpacing={2} columnSpacing={0} className="justify-items-center">
            <Grid item xs={12} className="p-4">
              <section className="shadow-2xl p-4 bg-white rounded-2xl">
                <div className="w-full mb-4 flex justify-end">
                  <DateToggleBtn setDate={setFromDate} />
                </div>
                <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                  <div className="flex justify-between text-diaGray items-center">
                    <h3 className="text-lg font-semibold font-codeSource">{tc("glucose")}</h3>
                    <Icon icon="ph:info" className="mx-3" />
                  </div>
                  <div className="my-3 bg-white rounded-xl pr-3">
                    {!isLoading ? <LineChartGraph props={data.logs}/> : <GraphSkeleton />}
                  </div>
                </section>
                <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                  <div className="flex justify-between text-diaGray items-center">
                    <h3 className="text-lg font-semibold font-codeSource">{t("glucose_distibution")}</h3>
                    <Icon icon="ph:info" className="mx-3" />
                  </div>
                  <div className="my-3 bg-white rounded-xl">
                    {!isLoading ? <PiGraph props={data.logs} /> : <GraphSkeleton />}
                  </div>
                </section>
                <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                  <div className="flex justify-between text-diaGray items-center">
                    <h3 className="text-lg font-semibold font-codeSource truncate">{t("per_meal_chart")}</h3>
                    <Icon icon="ph:info" className="mx-3" />
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-xl">
                    {!isLoading ? <BarGraph props={data.logs} /> : <GraphSkeleton />}
                  </div>
                </section>
                <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                  <div className="flex justify-between text-diaGray items-center">
                    <h3 className="text-lg font-semibold font-codeSource truncate">{t("insuling_daily_totals")}</h3>
                    <Icon icon="ph:info" className="mx-3" />
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-xl">
                    {!isLoading ? <InsulinDailyTotalsChart props={data.logs}/> : <GraphSkeleton />}
                  </div>
                </section>
                <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                  <div className="flex justify-between text-diaGray items-center">
                    <h3 className="text-lg font-semibold font-codeSource truncate">{t("macros_kcal_daily_totals")}</h3>
                    <Icon icon="ph:info" className="mx-3" />
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-xl">
                    {!isLoading ? <MacrosAndKcalChart props={data.logs} dailyCaloriesNeeds={user?.dailyCaloriesNeeds}/> : <GraphSkeleton />}
                  </div>
                </section>
              </section>
            </Grid>
          </Grid>
        </>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common','index']))
  }
});

export default withAuth(Charts);
