import { store } from "@/redux/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Whatsapp</title>
        <link rel="shortcut icon" href="/favicon.png"></link>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
