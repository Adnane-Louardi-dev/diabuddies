import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Glucose from "../components/glucose";
import ActiveInsulin from "../components/activeInsulin";

export default function Home() {
  const router = useRouter();
  const [Data, setData] = useState({});
  useEffect(() => {
    axios.get("/api/", { withCredentials: true }).then((fullData) => {
      // console.log(Data);
      setData(fullData.data.user);
    });
    return () => {
      setData({});
    };
  }, []);

  return (
    <>
      <ResponsiveAppBar props={Data} />
      <div className="p-5">
        <span className="font-inter text-2xl text-semibold">{`Good evening, ${Data?.givenName}`}</span>
        <div className="flex justify-around my-5">
          <Glucose />
          <ActiveInsulin />
        </div>
        <div className="w-full rounded-xl shadow-md">
          <div className="flex justify-between">
            <h3 className="text-lg text-diaGray font-rubik">Log book</h3>
            <AddIcon />
          </div>
        </div>
      </div>
    </>
  );
}
