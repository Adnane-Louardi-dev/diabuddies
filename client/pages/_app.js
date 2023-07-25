import "../styles/globals.css";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      //push API
      navigator.serviceWorker.register("/service-worker.js").then((registration) =>
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.APPLICATION_SERVER_KEY,
        })
      );
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
