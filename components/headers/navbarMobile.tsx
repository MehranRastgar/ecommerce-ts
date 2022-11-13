import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";

export default function NavbarMobile() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setOpenMenu(false);
  }, [router.asPath]);

  return (
    <nav
      className="flex flex-wrap justify-start 
        w-1/4
        filter 
        font-semibold
        "
    >
      <button
        className="flex h-fit m-2 p-2 border rounded-xl bg-gray-100"
        onClick={() => {
          setOpenMenu((PrevValue) => !PrevValue);
        }}
      >
        <GiHamburgerMenu color="#E71D37" size={20} />
      </button>

      {openMenu === true ? <OpenMenuModal setOpenMenu={setOpenMenu} /> : <></>}
    </nav>
  );
}

function OpenMenuModal({ setOpenMenu }: { setOpenMenu: any }) {
  const [drop, setDrop] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const settingState = useAppSelector(selectSettingsStatus);

  useEffect(() => {
    setTimeout(() => {
      setDrop(true);
    }, 50);
  }, []);
  useEffect(() => {
    if (drop) {
      if (settingState !== "idle") {
        dispatch(fetchSettingsAsync());
      }
    }
  }, [drop]);
  return (
    <div
      style={{
        transition: "all   300ms ease-in-out",
        width: `${drop === true ? "100%" : "0%"}`,
        height: `${true === true ? "100%" : "0%"}`,
        zIndex: "150",
      }}
      className={`justify-start flex fixed top-0 right-0  h-full bg-black/30 `}
    >
      <div className="flex flex-wrap w-3/6   border-cyan-400 p-2 h-full bg-white justify-start items-start overflow-y-auto">
        {/* <input placeholder='جستجو گزینه ها' className='p-2 m-2 cursor-pointer h-fit'></input> */}
        <div className="p-1 py-0 border-b-2 border-blackout-red h-fit w-full">
          <Link href={"/"}>
            <div>
              <Image
                loader={imageLoader}
                alt="InoMal Logo"
                src={"/Asset12.png"}
                priority
                width={80}
                height={50}
              />
            </div>
          </Link>
        </div>
        <div className="w-full h-fit border-b-2 ">
          <MobileImportantMenuComponent />
        </div>
        <div className="w-full h-fit ">
          <MobileCategoriesMenuComponent />
        </div>
        <div className="h-full"></div>
      </div>
      <div
        onClick={() => {
          setDrop(false);
          setTimeout(() => setOpenMenu(false), 200);
        }}
        className="flex w-3/6  h-full"
      ></div>
    </div>
  );
}

import { GoHome, GoGift } from "react-icons/go";
import { BsHeadset } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import imageLoader from "../../src/imageLoader";
import {
  fetchSettingsAsync,
  selectSettings,
  selectSettingsStatus,
} from "../../src/store/slices/settingsSlice";
import { Settings } from "../../src/types/types";

function MobileImportantMenuComponent() {
  const liClass: string = "w-full";

  return (
    <div>
      <ul
        key={"menu-high"}
        className="flex flex-wrap w-full text-[14px] font-Vazir-Bold text-gray-400"
      >
        <li key={"1"} className={liClass}>
          <Link href="/">
            <div className="flex py-2 px-1">
              <GoHome size={20} />
              <div className="flex px-2">صفحه اصلی</div>
            </div>
          </Link>
        </li>
        <li key={"2"} className={liClass}>
          <Link href="/">
            <div className="flex py-2 px-1">
              <BiBarChartAlt size={20} />
              <div className="flex px-2">پرفروش ترین ها</div>
            </div>
          </Link>
        </li>
        <li key={"3"} className={liClass}>
          <Link href="/">
            <div className="flex py-2 px-1">
              <GoGift size={20} />
              <div className="flex px-2">پیشنهاد های ویژه</div>
            </div>
          </Link>
        </li>
        <li key={"4"} className={liClass}>
          <Link href="/">
            <div className="flex py-2 px-1">
              <BsHeadset size={20} />
              <div className="flex px-2">تماس با ما</div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function MobileCategoriesMenuComponent() {
  const settings = useAppSelector(selectSettings);
  const settingsStatus = useAppSelector(selectSettingsStatus);
  const [categories, setCategories] = useState<Settings>();
  const [preview, setPreview] = useState<number>(100);
  const [transition, setTransition] = useState<boolean>(false);

  useEffect(() => {
    if (settingsStatus === "idle") {
      console.table(settings);
      settings.map((setting) => {
        if (setting.name === "categories") setCategories(setting);
      });
    }
  }, [settingsStatus, settings]);

  return (
    <>
      {settingsStatus === "idle" ? (
        <div className="text-gray-800 text-[13px] ">
          {categories?.properties?.[0]?.properties?.map((highCat, index1) => (
            <ul
              className="flex flex-wrap w-full justify-start cursor-pointer"
              key={index1 + "-ul1"}
            >
              <li
                onClick={() => {
                  if (index1 !== preview) {
                    setTransition(false);
                    setTimeout(() => {
                      setTransition(true);
                    }, 150);
                    setPreview(index1);
                  } else {
                    setTransition(false);
                    setTimeout(() => {
                      setPreview(100);
                    }, 150);
                  }
                }}
                key={index1 + "-l1"}
                className={`w-full inline-flex my-2 justify-start ${
                  preview === index1 ? "text-blackout-red2" : ""
                }`}
              >
                <div className="flex w-5/6">{highCat?.L1?.[0].title_fa}</div>
                <div className="flex mr-2 mt-1 w-1/6 justify-end">
                  {preview === index1 ? (
                    <HiChevronLeft size={15} />
                  ) : (
                    <HiChevronDown size={15} />
                  )}
                </div>
              </li>
              {preview === index1 ? (
                <Link
                  className="flex w-full mr-4 font-Vazir-Thin py-2 "
                  key={index1 + "-l2"}
                  href={`/search${highCat?.L1?.[0]?.url}`}
                >
                  <li>مشاهده تمام موارد این دسته</li>
                </Link>
              ) : (
                <></>
              )}
              {preview === index1 ? (
                highCat?.L2?.map((subcat, index2) => (
                  <Link
                    style={{
                      transition: "width   500ms ease-in-out",
                      width: `${transition === true ? "100%" : "0%"}`,
                    }}
                    className="flex w-full -mx-2 font-Vazir-Thin bg-gray-100 py-2 "
                    key={index2 + "-l2"}
                    href={`/search${subcat?.url}`}
                  >
                    <li
                    // key={index2 + "-l2"}
                    >
                      <div className="flex mr-4 w-full">{subcat.title_fa}</div>
                    </li>
                  </Link>
                ))
              ) : (
                <></>
              )}
            </ul>
          ))}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
