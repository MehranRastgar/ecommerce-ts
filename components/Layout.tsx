import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./headers/header";
import NavbarMobile from "./headers/navbarMobile";
import NavbarOne from "./headers/navbarOne";
import { isMobile, deviceDetect } from "react-device-detect";
import HeaderMobile from "./headers/headerMobile";
import MobileSearchComponent from "./search/MobileSearchComponent";
import { FaTelegram } from "react-icons/fa";
import { setDeviceType } from "../src/store/slices/themeSlice";
const eventScreenSize: number = 800;
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import axios from "axios";
import { Settings } from "../src/types/types";
import {
  fetchSettingsAsync,
  selectSettingsStatus,
  selectSettings,
} from "../src/store/slices/settingsSlice";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import imageLoader from "../src/imageLoader";

const fetcher = (URL: string) => axios.get(URL).then((res) => res.data);
const config: SWRConfiguration = {
  fallbackData: "fallback",
  revalidateOnMount: false,
  // ...
};

var scrollBefore = 0;

function Layout({ children }: { children: any }) {
  // const { data, error } = useSWR<Settings[]>(
  //   process.env.NEXT_PUBLIC_BASE_API_URL + "/settings/name/categories",
  //   fetcher,
  //   config
  // );
  const dispatch = useAppDispatch();
  const [ismob, setIsmob] = useState<string>("undefined");
  const [updateSize, setUpdateSize] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [navHidden, setNavHidden] = useState<boolean>(false);
  const [lastNumber, setLastNumber] = useState<number>(500);
  const [config, setConfig] = useState<boolean>(false);
  //================================================
  function configPage() {
    dispatch(fetchSettingsAsync());
    console.log("justOne time");
  }
  useEffect(() => {
    if (!config) {
      setConfig(true);
      configPage();
    }
  }, []);
  //================================================
  function scrollFunction() {
    var offsetY: number = window.pageYOffset;
    setLastNumber(window.pageYOffset);
    if (offsetY > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (scrollBefore - offsetY < 0) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
    scrollBefore = window.pageYOffset;
  }
  //================================================
  function sizeComponent() {
    var width = document.body.clientWidth;
    if (width < eventScreenSize && ismob === "false") {
      setIsmob("true");
    } else if (width > eventScreenSize && ismob === "true") {
      setIsmob("false");
    }
    setUpdateSize((pervValue) => !pervValue);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    window.addEventListener("resize", sizeComponent);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
      window.removeEventListener("resize", sizeComponent);
    };

    // configPage();
  }, []);
  //================================================
  useEffect(() => {
    const ismobact = isMobile === true ? "true" : "false";
    var width = document.body.clientWidth;

    if (width > eventScreenSize && ismobact === "false") {
      dispatch(setDeviceType("pc"));
      setIsmob("false");
    } else if (width < eventScreenSize && ismobact === "false") {
      dispatch(setDeviceType("mobile"));
      setIsmob("true");
    } else if (width < eventScreenSize && ismobact === "true") {
      dispatch(setDeviceType("mobile"));
      setIsmob("true");
    } else if (width > eventScreenSize && ismobact === "true") {
      dispatch(setDeviceType("pc"));
      setIsmob("false");
    }
  }, [updateSize]);
  //================================================

  return (
    <div>
      {ismob === "true" ? (
        <>
          <div className="flex bg-white border-b-2 mx-3">
            <NavbarMobile></NavbarMobile>
            <HeaderMobile></HeaderMobile>
            <button className="flex h-fit m-2 p-2 border rounded-xl bg-gray-100">
              <FaTelegram color="#f99e23" size={20} />
              {/* <div className="text-xs font-Vazir-Bold w-full">پشنیبانی</div> */}
            </button>
          </div>
          <MobileSearchComponent></MobileSearchComponent>
        </>
      ) : (
        <>
          {deviceDetect !== undefined && ismob !== "undefined" ? (
            <>
              <AdsBanner />
              <div className="topHeader flex flex-wrap w-full fixed h-[100px] items-start">
                <header
                  className={` relative  items-center flex flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap md:flex-nowrap sm:flex-wrap justify-start font-Vazir w-full filter  bg-white z-[1] transition-all duration-500
              ${isScrolled === true ? "-mt-[55px] h-[60px] " : "h-[60px] "}
             
              `}
                >
                  <Header></Header>
                </header>

                <NavbarOne
                  navHidden={navHidden}
                  isScrolled={isScrolled}
                ></NavbarOne>
              </div>
              <div className="flex w-full bg-white h-[100px]"></div>{" "}
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {deviceDetect !== undefined && ismob !== "undefined" ? (
        <div className="flex w-full justify-center">{children}</div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Layout;

function AdsBanner() {
  const liClass: string = "p-2 m-2 inline-flex justify-center w-auto ";

  return (
    <div className="max-h-[80px] h-auto  overflow-hidden flex w-full bg-white">
      <Link href={"/"}>
        <div className="mr-[80px]">
          <ul
            key={"menu-high"}
            className="flex  w-full text-[14px] font-Vazir-Bold text-gray-400"
          >
            <li key={"2"} className={liClass}>
              درباره ما
            </li>
            <li key={"3"} className={liClass}>
              تماس با ما
            </li>
            <li key={"4"} className={liClass}>
              شرایط گارانتی محصولات
            </li>
          </ul>
          {/* <Image
            className="max-h-[80px]"
            loader={imageLoader}
            alt="InoMal Logo"
            src={"/adsbanner.png"}
            unoptimized
            fill
            object-fit={"contain"}
          /> */}
        </div>
      </Link>
    </div>
  );
}
