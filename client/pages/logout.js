import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
const Logout = () => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        try {
          axios.get("/api/logout", { withCredentials: true }).then(() => router.push("/login"));
        } catch (e) {
          console.log(e);
        }
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
