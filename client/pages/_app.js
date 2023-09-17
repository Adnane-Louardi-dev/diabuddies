import "../styles/globals.css";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import Script from "next/script";
import showNotification from "../utils/showNotification";
import { appWithTranslation, useTranslation } from "next-i18next";
import Snackbar from "@mui/material/Snackbar";
import { initSW } from "../utils/initSW";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const [devices, setDevices] = useState([]);
  const [SnackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    initSW();
    (async () => {
      try {
        const availableDevices = await navigator.mediaDevices.enumerateDevices();
        const availableVideoDevices = availableDevices.filter((device) => device.kind === "videoinput");
        if (availableVideoDevices.length === 0) {
          setSnackbarMessage("No cameras found");
          setOpen(true);
          console.log("camera wowo");
        } else {
          setDevices(availableVideoDevices);
          console.log("devices", devices);
        }
      } catch (e) {
        setSnackbarMessage("Failed to find cameras. This could be permissions problem");
        console.log(new Error(e));
        setOpen(true);
      }
    })();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                   (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3618708,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `,
        }}
      />

      <Script strategy="lazyOnload">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
                });
            `}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={SnackbarMessage} />
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language}>
        <Component {...pageProps} />
      </LocalizationProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
