import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import {useRouter} from "next/router";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Glucose from "../components/glucose";
import ActiveInsulin from "../components/activeInsulin";
import LogBookItem from "../components/logBookItem";
import NewLogDialog from "../components/newLogDialog";
import LoadingCircle from "../components/loadingCircle";
import LineChartGraph from "../components/charts/lineChartGraph";
import PiGraph from "../components/charts/piGraph";
import BarGraph from "../components/charts/barGraph";
import DayPicker from "../components/dayPicker";
import {Icon} from "@iconify/react";
import Head from "next/head";
import {useQuery} from "@tanstack/react-query";
import {useGetCurrentUser} from "../customeHooks/useGetCurrentUser";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState(router.query.date || moment().format("L"));
  //GET method to get user info
  const { user, isLoading: isUserLoading } = useGetCurrentUser();

  const {
    isLoading,
    data: Data,
    error,
    refetch,
  } = useQuery({
    queryKey: ["indexChart"],
    queryFn: async () => {
      const result = await axios.get(`/api/?date=${date}`, { withCredentials: true });
      return result.data;
    },
    enabled: router.isReady,
    onSuccess: () => {
      router.push({ href: "/", query: { date: date } });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    refetch();
    if (router.isReady) {
      // redirect new users to setup page
      if (user.newUser) {
        router.push("/setup");
      }
    };
  }, [router.isReady, date]);

  return (
    <>
      {!isLoading && !isUserLoading ? (
        <>
          <Head>
            <meta name="title" content="Diabuddies | All-in-One Solution for Diabetes Management" />
            <title>Diabuddies | Home</title>
          </Head>
          <ResponsiveAppBar user={user} />
          <main className="p-4 relative overflow-y-hidden">
            <span className="font-inter text-2xl text-semibold">{`Good evening, ${user.givenName}`}</span>
            <DayPicker date={date} setDate={setDate} />
            {Data?.logBook[0] ? (
              <>
                <section className="flex justify-around my-5">
                  <Glucose props={Data.logBook[0]} />
                  <ActiveInsulin props={Data?.logBook} />
                </section>
              </>
            ) : null}

            <section className="w-full rounded-xl p-3 my-5 ">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-diaGray font-rubik">Recently</h3>
                <NewLogDialog />
              </div>
              {Data.logBook[0] ? (
                <div className="my-5 h-full overflow-scroll">
                  {Data.logBook.map((log) => {
                    return <LogBookItem props={log} key={log._id} />;
                  })}
                </div>
              ) : (
                <div className="grid items-center justify-center m-3 py-5 bg-white rounded-xl">
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
                </div>
              )}
            </section>
            {Data.graphData ? (
              <>
                <div className="flex justify-between items-center my-5">
                  <div className="flex items-center">
                    <div className="ring-1 ring-gray-300 p-1 rounded-md mr-3">
                      <Icon icon="flat-color-icons:line-chart" className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg text-diaGray font-semibold font-rubik">Charts</h3>
                  </div>
                  <Link href={"/charts"} aria-label="Charts page" target="_blank" passHref>
                    <Icon icon="ep:arrow-right-bold" className="h-6 w-6 text-diaGray" />
                  </Link>
                </div>
                <section className="shadow-2xl p-4 bg-white rounded-2xl">
                  <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                    <div className="flex justify-between text-diaGray items-center">
                      <h3 className="text-lg font-semibold font-rubik">Glucose</h3>
                      <Icon icon="ph:info" className="mx-3" />
                    </div>
                    <div className="my-3 bg-white rounded-xl pr-3">
                      {/* //reverse the graph to show the recent egvs from RTL */}
                      <LineChartGraph props={[...Data.graphData.egvs].reverse()} />
                    </div>
                  </section>
                  <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                    <div className="flex justify-between text-diaGray items-center">
                      <h3 className="text-lg font-semibold font-rubik">Glucose distibution</h3>
                      <Icon icon="ph:info" className="mx-3" />
                    </div>
                    <div className="my-3 bg-white rounded-xl">
                      <PiGraph props={Data.graphData.egvs} />
                    </div>
                  </section>
                  <section className="w-full rounded-xl mb-10 ring-1 ring-gray-300 p-2">
                    <div className="flex justify-between text-diaGray items-center">
                      <h3 className="text-lg font-semibold font-rubik truncate">Carbs and insulin combination</h3>
                      <Icon icon="ph:info" className="mx-3" />
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-xl">
                      <BarGraph props={[...Data.logBook].reverse()} />
                    </div>
                  </section>
                </section>
              </>
            ) : null}
          </main>
        </>
      ) : (
        <div className="grid h-screen justify-center content-center">
          <LoadingCircle />
        </div>
      )}
    </>
  );
}
