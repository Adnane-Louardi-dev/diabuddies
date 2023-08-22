import "../styles/globals.css";
import Head from "next/head";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";
import Script from "next/script"
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  useEffect( () => {
      if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").then((registration) => console.log("scope is: ", registration.scope));
      }
      if (typeof window !== undefined) {
          window.OneSignal = window.OneSignal || [];
          OneSignal.push(function () {
              OneSignal.init({
                  appId: "6631d4a2-a1df-4cf0-92e1-da016bdd083c",
                  notifyButton: {
                      enable: true,
                  },
              });
          });
      }

      }, []);
  return (
    <QueryClientProvider client={queryClient}>
        <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
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
                `
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
        <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer/>
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
