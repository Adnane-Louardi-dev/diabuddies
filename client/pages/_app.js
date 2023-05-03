import store from "../app/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </Provider>
  );
}

export default MyApp;
