import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { data } from "autoprefixer";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Home() {
  const router = useRouter();
  const [Data, setData] = useState({});
  useEffect(() => {
    axios.get("http://localhost:3000/", { withCredentials: true }).then((fullData) => {
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
      <div className="">{`hello ${Data?.givenName}`}</div>
    </>
  );
}
