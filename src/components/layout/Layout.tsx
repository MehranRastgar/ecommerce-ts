import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Header from "../header";
import store from "src/store/store";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";
import { useLanguage } from "../../hooks/useLanguage";
import NextNProgress from "nextjs-progressbar";
import { LoadingTwo } from "../loader/default";
import imageLoader from "src/imageLoader";
import Image from "next/image";
import { useRouter } from "next/router";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { locale } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStartChange = () => {
      setIsLoading(true);
    };
    const handleEndChange = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStartChange);
    router.events.on("routeChangeComplete", handleEndChange);
    router.events.on("routeChangeError", handleEndChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleStartChange);
      router.events.off("routeChangeComplete", handleEndChange);
      router.events.off("routeChangeError", handleEndChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>arvanta</title>
        </Head>
        <div className="flex flex-col min-h-[100vh]">
          {/* <NextNProgress height={7} /> */}
          <IsLoadingLogo isLoading={isLoading} />
          <Header />
          <main className="flex-grow  md:mt-40">{children}</main>
          <Footer />
        </div>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          rtl={locale === "en" ? false : true}
          position={locale === "en" ? "top-right" : "top-left"}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;

interface PropsIsLoadingLogo {
  isLoading: boolean;
}

const IsLoadingLogo: React.FC<PropsIsLoadingLogo> = (props) => {
  return (
    <>
      {props.isLoading && (
        <div className="fixed flex-wrap flex items-center justify-center z-[1000] bg-transparent top-0 left-0 h-[100%] w-[100%]">
          <div className="flex flex-wrap h-fit">
            <div className="flex h-fit justify-center w-full">
              <Image
                className=""
                loader={imageLoader}
                alt="InoMal Logo"
                src={"/Asset14.png"}
                unoptimized
                width={160}
                height={100}
              />
            </div>
            <div className="flex h-fit justify-center w-full">
              <LoadingTwo />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
