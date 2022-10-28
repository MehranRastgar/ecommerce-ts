import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../src/store/hooks";
import {
  selectMobileNumber,
  setMobile,
  selectUserInfo,
} from "../../src/store/slices/clientSlice";
import imageLoader from "../../src/imageLoader";

export default function NavbarOne() {
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
        bg-green-400
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
  useEffect(() => {
    setTimeout(() => {
      setDrop(true);
    }, 50);
  }, []);

  return (
    <div
      style={{
        transition: "all   300ms ease-in-out",
        width: `${drop === true ? "100%" : "0%"}`,
        height: `${drop === true ? "100%" : "0%"}`,
        zIndex: "2",
      }}
      className="justify-start flex fixed top-0 right-0 w-full h-full bg-black/30  z-[2]"
    >
      <div className="flex flex-wrap w-4/5 border-cyan-400 p-2 h-full bg-white justify-start items-start overflow-y-auto">
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
          {/* <MobileImportantMenuComponent /> */}
        </div>
        <div className="w-full h-fit ">
          {/* <MobileCategoriesMenuComponent /> */}
        </div>
        <div className="h-full"></div>
      </div>
      <div
        onClick={() => setOpenMenu(false)}
        className="flex w-1/5  h-full"
      ></div>
    </div>
  );
}
