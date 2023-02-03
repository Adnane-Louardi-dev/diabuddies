import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Glucose from "../components/glucose";
import ActiveInsulin from "../components/activeInsulin";
import LogBookItem from "../components/logBookItem";
import LoadingCircle from "../components/loadingCircle";
import NewLogDialog from "../components/newLogDialog";
export default function Home() {
  const router = useRouter();
  const [Data, setData] = useState();
  useEffect(() => {
    axios.get("/api/?date=2023-02-01", { withCredentials: true }).then((fullData) => {
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
              <Glucose />
              <ActiveInsulin />
            </section>
            <section className="w-full rounded-xl shadow-sm p-3">
              <div className="flex justify-between">
                <h3 className="text-lg text-diaGray font-rubik">Recent meals</h3>
                <NewLogDialog />
              </div>
              {Data.logBook.map((log) => {
                console.log(log);
                return <LogBookItem props={log} key={log._id} />;
              })}
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
