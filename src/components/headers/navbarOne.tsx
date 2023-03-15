import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiChevronDoubleLeft } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GoGift } from "react-icons/go";
import {
  crmChangeState,
  crmStatus,
  fetchSettingsAsync,
  selectSettings,
  selectSettingsStatus,
} from "../../store/slices/settingsSlice";
import { Settings } from "../../types/types";
import { BsHeadset } from "react-icons/bs";

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
  const dispatch = useAppDispatch();
  const settingState = useAppSelector(selectSettingsStatus);
  const crmRequest = useAppSelector(crmStatus);

  useEffect(() => {
    setOpenMenu(false);
  }, [router.asPath]);
  useEffect(() => {
    if (openMenu === true || openCategorieMenu == true) {
      if (settingState !== "idle") {
        dispatch(fetchSettingsAsync());
      }
    }
  }, [openMenu, openCategorieMenu]);
  return (
    <div
      className={`transition-all duration-500 w-screen border-b-2 bg-ino-white ${
        navHidden === true && openCategorieMenu !== true
          ? "-mt-[100px] h-[50px] overflow-hidden -z-[2] border-b-2"
          : `h-[40px] bg-ino-white ${isScrolled === true ? "-mt-[0px]" : ""}`
      }`}
    >
      <nav className="inline-flex mr-[80px] items-center justify-start filter font-semibold bg-ino-white w-full">
        <ul className="-mr-3 inline-flex text-[14px] font-Vazir-Medium text-gray-400">
          <li
            onMouseEnter={() => {
              setOpenCategorieMenu(true);
            }}
            onTouchEnd={() => {
              setOpenCategorieMenu((value) => !value);
            }}
            onMouseLeave={() => {
              setOpenCategorieMenu(false);
            }}
            className={`flex border-l  `}
          >
            <div
              className={` flex mr-6 pr-0 px-6 py-2 hover:shadow-xl ${
                openCategorieMenu === true ? "border-b-red-500" : ""
              } border-b-2 border-b-transparent `}
            >
              <GiHamburgerMenu size={20} />
              <span className="mr-2">دسته بندی ها</span>
            </div>
            <div
              style={{
                transition: "all 300ms ease-in-out",
                opacity: `${openCategorieMenu === true ? "100%" : "0%"}`,
                width: `${true === true ? "66%" : "0%"}`,
                height: `${openCategorieMenu === true ? "66%" : "0%"}`,
                zIndex: "2",
              }}
              className="fixed mr-[90px] flex w-2/3 bg-ino-white h-2/3 rounded-b-xl   mt-[39px]  right-0  z-50"
            >
              {openCategorieMenu === true ? <CategoriesMenuWindow /> : <></>}
            </div>
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
            <Link
              className={styleClassLink}
              href="/search?sorttype=asce&sort=price&issale=true"
            >
              <GoGift size={20} color="#E71D37" />
              <span className="mr-2">تخفیف ویژه</span>
            </Link>
          </li>
          <li className={styleClassLi}>
            <Link
              className={styleClassLink}
              href="/search?sorttype=asce&sort=sell"
            >
              پرفروش ها
            </Link>
          </li>
          <li className={styleClassLi}>
            <Link className={styleClassLink} href="/aboutus">
              تماس با ما
            </Link>
          </li>
          <li
            onClick={() => {
              dispatch(crmChangeState());
            }}
            className={styleClassLi}
          >
            <div
              className={
                styleClassLink +
                " cursor-pointer " +
                `${crmRequest === "open" ? " text-[#00ff00]" : ""}`
              }
            >
              پشتیبانی آنلاین
              <BsHeadset
                color={crmRequest === "open" ? "#00ff00" : "#FF4500"}
                size={20}
              />
            </div>
            {/* <div className="text-xs font-Vazir-Bold w-full">پشنیبانی</div> */}
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
//       <div className="flex flex-wrap w-4/5 border-cyan-400 p-2 h-full bg-ino-white justify-start items-start overflow-y-auto">
//         {/* <input placeholder='جستجو گزینه ها' className='p-2 m-2 cursor-pointer h-fit'></input> */}
//         <div className="p-1 py-0 border-b-2 border-blackout-red h-fit w-full">
//           <Link href={"/"}>
//             <div>
//               <Image
//                 loader={imageLoader}
//                 alt="InoMal Logo"
//                 src={"/Asset13.png"}
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
  const settings = useAppSelector(selectSettings);
  const settingsStatus = useAppSelector(selectSettingsStatus);
  const [categories, setCategories] = useState<Settings>();
  const [preview, setPreview] = useState<number>(100);
  const [transition, setTransition] = useState<boolean>(false);
  const [menuSelector, setMenuSelector] = useState<number>(0);

  useEffect(() => {
    if (settingsStatus === "idle") {
      // console.table(settings);
      settings.map((setting) => {
        if (setting.name === "categories") setCategories(setting);
      });
    }
  }, [settingsStatus, settings]);

  const [drop, setDrop] = useState<boolean>(true);
  useEffect(() => {}, []);
  return (
    <>
      {settingsStatus === "idle" ? (
        <>
          <div className="border-l-2">
            {categories?.properties?.[0]?.properties?.map((highCat, index1) => (
              <ul
                className="flex flex-wrap w-auto justify-start cursor-pointer"
                key={index1 + "-ul1"}
              >
                <li
                  onMouseEnter={() => {
                    setMenuSelector(index1);
                  }}
                  className={`flex w-[200px] h-12 items-center px-6 py-6 ${
                    menuSelector === index1
                      ? "bg-ino-lwhite text-ino-primary"
                      : ""
                  }`}
                >
                  {highCat.L1?.[0]?.title_fa}
                </li>
              </ul>
            ))}{" "}
          </div>
          <div className="">
            <Link
              className="flex w-full mr-4 font-Vazir-Thin py-2 justify-start m-3"
              key={menuSelector + "-l2"}
              href={`/search${categories?.properties?.[0]?.properties?.[menuSelector].L1?.[0]?.url}`}
            >
              <li className="flex px-2">
                مشاهده تمام محصولات{" "}
                {
                  categories?.properties?.[0]?.properties?.[menuSelector]
                    .L1?.[0]?.title_fa
                }
              </li>
              <HiChevronDoubleLeft size={15} />
            </Link>
            {categories?.properties?.[0]?.properties?.[menuSelector]?.L2?.map(
              (subcat, index1) => (
                <ul
                  className="flex flex-wrap w-auto justify-start cursor-pointer mx-2 px-6"
                  key={index1 + "-ul1"}
                >
                  <Link
                    className="flex w-auto mr-4 font-Vazir-Light py-2 justify-start text-[14px] hover:text-ino-primary "
                    key={menuSelector + "-l2"}
                    href={`/search${subcat?.url}`}
                  >
                    <li
                      // onMouseEnter={() => {
                      //   setMenuSelector(index1);
                      // }}
                      className={`flex items-center `}
                    >
                      {subcat.title_fa}
                    </li>
                  </Link>
                </ul>
              )
            )}{" "}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
