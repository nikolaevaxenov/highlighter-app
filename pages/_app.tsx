import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Syntax highlighter app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="wrapper">
        <div className="wrapper__content">
          <Component {...pageProps} />
        </div>
        <div className="wrapper_footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MyApp;
