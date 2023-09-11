import "../styles/globals.css";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useTransition } from "react";
import Script from "next/script";
const queryClient = new QueryClient();
import showNotification from "../utils/showNotification";
import { appWithTranslation, useTranslation } from "next-i18next";

export function initSW() {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
      navigator.serviceWorker.ready.then(async (registration) => {
        if ("periodicSync" in registration) {
          const status = await navigator.permissions.query({
            // @ts-expect-error
            name: "periodic-background-sync",
          });

          if (status.state === "granted") {
            await registration.periodicSync.register("show-notification", {
              minInterval: 3 * 60 * 60 * 1000,
            });
          }
        }
      });
    }
  });
}

function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
      navigator.serviceWorker.ready.then(async (registration) => {
        if ("periodicSync" in registration) {
          const status = await navigator.permissions.query({
            name: "periodic-background-sync",
          });

          if (status.state === "granted") {
            await registration.periodicSync.register("show-notification", {
              minInterval: 1000,
            });
          }
        }
      });
    }
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
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language}>
        <Component {...pageProps} />
      </LocalizationProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
