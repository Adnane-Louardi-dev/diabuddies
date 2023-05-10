import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Glucose from "../components/glucose";
import ActiveInsulin from "../components/activeInsulin";
import LogBookItem from "../components/logBookItem";
import NewLogDialog from "../components/newLogDialog";
import GraphSelect from "../components/GraphSelect";
import LoadingCircle from "../components/loadingCircle";
import LineChartGraph from "../components/charts/lineChartGraph";
import PiGraph from "../components/charts/piGraph";
import BarGraph from "../components/charts/barGraph";
import DayPicker from "../components/dayPicker";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  let date = useSelector((state) => state.dayPicker?.value);
  const [Data, setData] = useState();
  const queryDate = router.query.date;
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      if (!date) {
        date = queryDate;
      }
      //get date from url query or from the date component
      axios.get(`/api/?date=${date}`, { withCredentials: true }).then((fullData) => {
        const data = fullData.data;
        setData(data);
        console.log(fullData);
        // if (data.user.newUser) {
        //   router.push("/setup");
        // }
      });
      router.push({ href: "/", query: { date: date } });
    }
  }, [router.isReady, date]);

  return (
    <>
      {Data ? (
        <>
          <ResponsiveAppBar props={Data?.user} />
          <main className="p-5">
            <span className="font-inter text-2xl text-semibold">{`Good evening, ${Data?.user?.givenName}`}</span>
            <DayPicker />
            {Data.logBook[0] ? (
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
                  <Image src={"/No-data-cuate.png"} height={300} width={200} alt="no data in blue folder" />
                </div>
              )}
            </section>
            {Data ? (
              <>
                <section className="w-full py-3 mb-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-diaGray font-rubik px-3">Glucose</h3>
                    <GraphSelect />
                  </div>
                  <div className="my-3 bg-white rounded-xl py-6 pr-3">
                    {/* //reverse the graph to show the recent egvs from RTL */}
                    <LineChartGraph props={Data.graphData.egvs} />
                  </div>
                </section>
                <section className="w-full py-3 mb-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-diaGray font-rubik px-3">Glucose distibution</h3>
                    <GraphSelect />
                  </div>
                  <div className="my-3 bg-white rounded-xl py-3 pr-3">
                    <PiGraph props={Data.graphData.egvs} />
                  </div>
                </section>
                <section className="w-full py-3 mb-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-diaGray font-rubik px-3">Carbs and insulin combination</h3>
                    <GraphSelect />
                  </div>
                  <div className="my-3 bg-white rounded-xl py-3 pr-3">
                    <BarGraph props={[...Data.logBook].reverse()} />
                  </div>
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
