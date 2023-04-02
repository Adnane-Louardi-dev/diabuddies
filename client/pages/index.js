import { useState, useEffect } from "react";
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
export default function Home() {
  const router = useRouter();
  const [Data, setData] = useState();
  useEffect(() => {
    axios.get("/api/", { withCredentials: true }).then((fullData) => {
      const data = fullData.data;
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      {Data ? (
        <>
          <ResponsiveAppBar props={Data?.user} />
          <main className="p-5">
            <span className="font-inter text-2xl text-semibold">{`Good evening, ${Data?.user?.givenName}`}</span>

            <section className="flex justify-around my-5">
              <Glucose props={Data.logBook[0]} />
              <ActiveInsulin props={Data.logBook} />
            </section>

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
                  <Image src={"/No-data-cuate.png"} height={300} width={200} />
                </div>
              )}
            </section>

            <section className="w-full py-3 mb-10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-diaGray font-rubik px-3">Glucose</h3>
                <GraphSelect />
              </div>
              <div className="my-3 bg-white rounded-xl py-3 pr-3">
                {/* //reverse the graph to show the recent egvs from RTL */}
                <LineChartGraph props={[...Data.graphData.egvs].reverse()} />
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
