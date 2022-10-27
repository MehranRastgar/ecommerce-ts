import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./headers/header";
import NavbarMobile from "./headers/navbarMobile";
import NavbarOne from "./headers/navbarOne";
import { isMobile } from "react-device-detect";
import HeaderMobile from "./headers/headerMobile";
import MobileSearchComponent from "./search/MobileSearchComponent";
import { FaTelegram } from "react-icons/fa";
import { setDeviceType } from "../src/store/slices/themeSlice";
const eventScreemSize: number = 720;
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
function Layout({ children }: { children: any }) {
  const { data, error } = useSWR<Settings[]>(
    process.env.NEXT_PUBLIC_BASE_API_URL + "/settings/name/categories",
    fetcher,
    config
  );
  const dispatch = useAppDispatch();
  const [ismob, setIsmob] = useState<string>("true");
  const [updateSize, setUpdateSize] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchSettingsAsync());
    window.addEventListener("resize", (event) => {
      var width = document.body.clientWidth;
      if (width < eventScreemSize && ismob == "false") {
        setIsmob("true");
      } else if (width > eventScreemSize && ismob == "true") {
        setIsmob("false");
      }

      // console.log(width)
      // console.log(ismob)
      setUpdateSize((pervValue) => !pervValue);
    });
    console.log("this is data of settings", data);
    console.log(error);
  }, []);

  useEffect(() => {
    const ismobact = isMobile === true ? "true" : "false";
    var width = document.body.clientWidth;

    if (width > eventScreemSize && ismobact == "false") {
      dispatch(setDeviceType("pc"));
      setIsmob("false");
    } else if (width < eventScreemSize && ismobact == "false") {
      dispatch(setDeviceType("mobile"));
      setIsmob("true");
    } else if (width < eventScreemSize && ismobact == "true") {
      dispatch(setDeviceType("mobile"));
      setIsmob("true");
    } else if (width > eventScreemSize && ismobact == "true") {
      dispatch(setDeviceType("pc"));
      setIsmob("false");
    }
  }, [updateSize]);

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
          <div className="flex flex-wrap w-full fixed h-[180px]">
            <AdsBanner />
            <Header></Header>
            <NavbarOne></NavbarOne>
          </div>
          <div className="flex w-screen bg-red-500 h-[200px]"></div>
        </>
      )}
      {children}
    </div>
  );
}

export default Layout;

function AdsBanner() {
  return (
    <div className="max-h-[80px] h-[80px] overflow-hidden flex w-full bg-blackout-saffron">
      <Link href={"/"}>
        <div>
          <Image
            className="max-h-[80px]"
            loader={imageLoader}
            alt="InoMal Logo"
            src={"/adsbanner.png"}
            unoptimized
            fill
            object-fit={"contain"}
          />
        </div>
      </Link>
    </div>
  );
}
