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
import { GoGift } from "react-icons/go";

export default function NavbarOne({
  isScrolled,
  navHidden,
}: {
  isScrolled: boolean;
  navHidden: boolean;
}) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openCategorieMenu, setOpenCategorieMenu] = useState<boolean>(false);
  const router = useRouter();
  const styleClassLi = `flex border-l  `;
  const styleClassLink = `flex px-6 py-2 hover:border-b-2 hover:border-b-red-500 border-b-2 border-b-transparent `;

  useEffect(() => {
    setOpenMenu(false);
  }, [router.asPath]);

  return (
    <div
      className={`transition-all duration-500 w-screen border-b-2 bg-white ${
        navHidden === true && openCategorieMenu !== true
          ? "-mt-[90px] h-[50px] overflow-hidden -z-[2] border-b-2"
          : `h-[40px] bg-white ${isScrolled === true ? "-mt-[50px]" : ""}`
      }`}
    >
      <nav className="inline-flex mr-[80px] items-center justify-start filter font-semibold bg-white w-full">
        <ul className="-mr-3 inline-flex text-[14px] font-Vazir-Medium text-gray-400">
          <li
            onMouseEnter={() => {
              setOpenCategorieMenu(true);
            }}
            onMouseLeave={() => {
              setOpenCategorieMenu(false);
            }}
            className={`flex border-l  `}
          >
            <Link
              className={` flex mr-6 pr-0 px-6 py-2 hover:shadow-xl ${
                openCategorieMenu === true ? "border-b-red-500" : ""
              } border-b-2 border-b-transparent `}
              href="/"
            >
              <GiHamburgerMenu size={20} />
              <span className="mr-2">دسته بندی ها</span>
            </Link>
            {openCategorieMenu === true ? <CategoriesMenuWindow /> : <></>}

            {openCategorieMenu === true ? (
              <div
                onMouseEnter={() => {
                  setOpenCategorieMenu(false);
                }}
                className="fixed  mt-[40px] flex justify-start   h-full w-full right-0 bg-black/30 z-49"
              ></div>
            ) : (
              <></>
            )}
          </li>
          <li className={styleClassLi}>
            <Link className={styleClassLink} href="/res">
              پیگیری سفارش
            </Link>
          </li>
          <li className={styleClassLi}>
            <Link className={styleClassLink} href="/res">
              <GoGift size={20} color="#E71D37" />
              <span className="mr-2">پیشنهاد شگفت انگیز</span>
            </Link>
          </li>
          <li className={styleClassLi}>
            <Link className={styleClassLink} href="/res">
              پرفروش ها
            </Link>
          </li>
          <li className={styleClassLi}>
            <Link className={styleClassLink} href="/res">
              تماس با ما
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// function OpenMenuModal({ setOpenMenu }: { setOpenMenu: any }) {
//   const [drop, setDrop] = useState<boolean>(false);
//   useEffect(() => {
//     setTimeout(() => {
//       setDrop(true);
//     }, 50);
//   }, []);

//   return (
//     <div
//       style={{
//         transition: "all   300ms ease-in-out",
//         width: `${drop === true ? "100%" : "0%"}`,
//         height: `${drop === true ? "100%" : "0%"}`,
//         zIndex: "2",
//       }}
//       className="justify-start flex fixed top-0 right-0 w-full h-full bg-black/30  z-[2]"
//     >
//       <div className="flex flex-wrap w-4/5 border-cyan-400 p-2 h-full bg-white justify-start items-start overflow-y-auto">
//         {/* <input placeholder='جستجو گزینه ها' className='p-2 m-2 cursor-pointer h-fit'></input> */}
//         <div className="p-1 py-0 border-b-2 border-blackout-red h-fit w-full">
//           <Link href={"/"}>
//             <div>
//               <Image
//                 loader={imageLoader}
//                 alt="InoMal Logo"
//                 src={"/Asset12.png"}
//                 unoptimized
//                 width={80}
//                 height={50}
//               />
//             </div>
//           </Link>
//         </div>
//         <div className="w-full h-fit border-b-2 ">
//           {/* <MobileImportantMenuComponent /> */}
//         </div>
//         <div className="w-full h-fit ">
//           {/* <MobileCategoriesMenuComponent /> */}
//         </div>
//         <div className="h-full"></div>
//       </div>
//       <div
//         onClick={() => setOpenMenu(false)}
//         className="flex w-1/5  h-full"
//       ></div>
//     </div>
//   );
// }

export function CategoriesMenuWindow() {
  const [drop, setDrop] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setDrop(true);
    }, 50);
  }, []);
  return (
    <div
      style={{
        transition: "all 300ms ease-in-out",
        width: `${drop === true ? "66%" : "0%"}`,
        height: `${drop === true ? "66%" : "0%"}`,
        zIndex: "2",
      }}
      className="fixed mr-[90px] flex w-2/3 bg-white h-2/3 rounded-b-xl   mt-[39px]  right-0  z-50"
    ></div>
  );
}
