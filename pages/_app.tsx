// import type { AppProps } from 'next/app'
// import { ReactElement, ReactNode } from 'react';
// import { NextPage } from 'next';
// // import {wrapper} from '../src/store/store'
// // import {Provider} from 'react-redux';

// type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps  & {
//   Component: NextPageWithLayout
// }

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {

//   const getLayout = Component.getLayout ?? ((page) => page);

//   return getLayout(<Component {...pageProps} />);
// }

// export default MyApp
import "../styles/index.css";
import "../src/scss/App.scss";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";

import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

import store from "../src/store/store";
import Layout from "src/components/layout/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
