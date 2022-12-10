import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { data } from "autoprefixer";

export default function Home() {
  const router = useRouter();
  const [Data, setData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true })
      .then((fullData) => {
        const data = JSON.stringify(fullData.data);
        console.log(fullData);
        if (!data || data === "{}") {
          router.push({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        }
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [Data]);
  return <div className="">hello user</div>;
}
