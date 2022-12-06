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
        className="flex h-fit m-2 p-2 border rounded-xl bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-ino-primary to-ino-dark text-white"
        onClick={() => {
          setOpenMenu((PrevValue) => !PrevValue);
        }}
      >
        <GiHamburgerMenu size={20} />
      </button>
      {/* openMenu */}
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
      <div className="flex flex-wrap w-5/6   border-ino-primary p-2 h-full bg-ino-white justify-start items-start overflow-y-auto">
        {/* <input placeholder='جستجو گزینه ها' className='p-2 m-2 cursor-pointer h-fit'></input> */}
        <div className="p-2 py-2 border-b-2 border-ino-primary h-fit w-full my-2">
          <Link href={"/"}>
            <div>
              <Image
                loader={imageLoader}
                unoptimized
                alt="InoMal Logo"
                src={"/Asset13.png"}
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
        className="flex flex-wrap w-full text-[14px] font-Vazir-Bold text-ino-gray mt-2"
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
  const router = useRouter();

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
        <div className="text-ino-white text-[13px] ">
          {categories?.properties?.[0]?.properties?.map((highCat, index1) => (
            <ul
              className={`${
                preview !== index1
                  ? "h-[50px] overflow-hidden"
                  : "h-[300px] overflow-y-scroll overflow-x-hidden"
              } transition-all flex flex-wrap w-full justify-start cursor-pointer`}
              key={index1 + "-ul1"}
            >
              <li
                key={index1 + "-l1"}
                className={`flex flex-wrap w-full h-fit my-2 justify-start  ${
                  preview === index1
                    ? "text-ino-primary font-bold"
                    : "text-ino-lgray"
                }`}
              >
                <div
                  onClick={() => {
                    if (index1 !== preview) {
                      setTransition(false);
                      setTransition(true);
                      setPreview(index1);
                    } else {
                      setTransition(false);
                      setPreview(100);
                    }
                  }}
                  className="flex h-fit w-5/6 border p-2 rounded-md"
                >
                  {highCat?.L1?.[0].title_fa}{" "}
                  <div className="flex mr-2 mt-1 w-1/6 justify-end">
                    {preview === index1 ? (
                      <HiChevronLeft size={15} />
                    ) : (
                      <HiChevronDown size={15} />
                    )}
                  </div>
                </div>

                <ul>
                  <li
                    onClick={() => {
                      router.push(`/search${highCat?.L1?.[0].url}`);
                    }}
                    className="flex p-2 my-2 border rounded-md items-center"
                  >
                    مشاهده تمام موارد این دسته
                    <div className="flex mx-1">
                      {" "}
                      <HiChevronLeft size={15} />
                    </div>
                  </li>

                  {highCat?.L2?.map((subcat, index2) => (
                    <>
                      <li
                        onClick={() => {
                          router.push(`/search${subcat?.url}`);
                        }}
                        key={index2 + "-l2"}
                      >
                        <div className="flex mr-4 w-full p-2 border rounded-md mt-1">
                          {subcat.title_fa}
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
