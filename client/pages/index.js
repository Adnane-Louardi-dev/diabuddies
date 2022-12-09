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
      .get("http://localhost:3000/")
      .then((fullData) => {
        const data = JSON.stringify(fullData.data);

        setData(data);
        return data;
      })
      .then((data) => {
        console.log(data);
        if (!data) {
          router.push({
            pathname: "/login",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <div className="text-greeno">hello</div>;
}
