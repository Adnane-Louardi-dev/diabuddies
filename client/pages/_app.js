import "../styles/globals.css";
import Head from "next/head";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"


const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
            </Head>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Component {...pageProps} />
            </LocalizationProvider>
        </QueryClientProvider>
  );
}

export default MyApp;
