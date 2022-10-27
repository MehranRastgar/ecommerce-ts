import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../src/store/hooks";
import {
  selectMobileNumber,
  setMobile,
  selectUserInfo,
} from "../../src/slices/clientSlice";

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
  return (
    <div className="justify-start flex fixed top-0 right-0 w-full h-full bg-black/30">
      <div className="flex flex-wrap w-2/3   border-cyan-400 p-2 h-full bg-white justify-start items-start">
        {/* <input placeholder='جستجو گزینه ها' className='p-2 m-2 cursor-pointer h-fit'></input> */}
        <div className="p-1 py-0 border-b-2 border-blackout-red h-fit w-full">
          <Link href={"/"}>
            <div>
              <Image
                loader={imageLoader}
                alt="InoMal Logo"
                src={"/Asset12.png"}
                unoptimized
                width={80}
                height={50}
              />
            </div>
          </Link>
        </div>
        <div className="w-full h-fit border-b-2 ">
          <MobileImportantMenuComponent />
        </div>
        <div className="w-full h-fit">
          <MobileCategoriesMenuComponent />
        </div>
        <div className="h-full"></div>
      </div>

      <div
        onClick={() => setOpenMenu(false)}
        className="flex w-1/3  h-full"
      ></div>
    </div>
  );
}

import { GoHome, GoGift } from "react-icons/go";
import { BsHeadset } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import { Client } from "../../src/types/types";
import imageLoader from "../../src/imageLoader";

function MobileImportantMenuComponent() {
  const liClass: string = "w-full";
  return (
    <div>
      <ul
        key={"menu-high"}
        className="flex flex-wrap w-full font-Vazir-Bold text-gray-400"
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
  return <div>from backend</div>;
}

{
  /* <ul className="flex flex-wrap w-1/2 bg-red-300">
<li className={liClass}><a href="">Home</a></li>
<li className={liClass}><a href="">News</a></li>
<li className={liClass}><a href="">Contact</a></li>
<li className={liClass}><a href="">About</a></li>
</ul> */
}
