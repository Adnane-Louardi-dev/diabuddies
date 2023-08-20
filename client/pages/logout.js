import { useRouter } from "next/router";
import {useEffect} from "react";
import axios from "axios";
const Logout = () => {
  const router = useRouter();
  const logoutFun=async () => {
      try {
          axios.get("/api/logout", { withCredentials: true }).then(() => router.push("/login"));
      } catch (e) {
          console.log(e);
      }
  }
  useEffect(()=>{logoutFun()},[])

  return null

};

export default Logout;
