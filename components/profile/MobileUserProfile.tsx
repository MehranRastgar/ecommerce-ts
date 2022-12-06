import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  removeProfile,
  selectSignInFlag,
  selectUserInfo,
  selectUserInfoStatus,
} from "../../src/store/slices/clientSlice";
import { selectDeviceType } from "../../src/store/slices/themeSlice";
import { Client } from "../../src/types/types";
import { useRouter } from "next/router";

export default function MobileUserProfile() {
  const [userCheck, setUserCheck] = useState<string | undefined>(undefined);
  const router = useRouter();
  const userInfo: Client = useAppSelector(selectUserInfo);
  const signInFlag = useAppSelector(selectSignInFlag);

  const mobileCheck = useAppSelector(selectDeviceType);
  const dispatch = useAppDispatch();
  const [drop, setDrop] = useState<boolean>(false);
  const profileElement = useRef<HTMLDivElement>(null);
  // const numb: string | undefined = String(
  //   document?.getElementById("user-profile")?.offsetLeft
  // );

  useEffect(() => {
    setUserCheck(userInfo?.firstname);
  }, [userInfo?.firstname]);
  useEffect(() => {
    setDrop(false);
  }, [router]);
  const timeout: number = 200;

  return (
    <>
      {drop ? (
        <div
          onMouseEnter={() => {
            setDrop(false);
          }}
          onClick={() => {
            setDrop(false);
          }}
          className={`fixed hidden ${
            !drop ? "hidden" : "md:flex"
          } top-0 left-0 z-[100] w-[100%] h-[100%] bg-ino-lgray/10 `}
        ></div>
      ) : (
        <></>
      )}
      <div
        id="user-container"
        onMouseEnter={() => {
          setDrop(true);
        }}
        onTouchEnd={() => {
          setDrop(true);
        }}
        onMouseLeave={() => {
          setDrop(false);
        }}
        className="justify-end hidden md:flex"
      >
        <button
          className={`rounded-xl  ${
            !drop ? "text-ino-hgray" : "text-ino-hgray"
          } ${drop === true ? " z-[100]" : "z-[100]"}`}
        >
          {signInFlag !== "idle" ? (
            <>
              {signInFlag !== "success" ? (
                <button
                  onClick={() => {
                    router.push("/client/login");
                  }}
                  className="flex flex-wrap border rounded-xl p-2 text-xs md:text-sm font-Vazir-Medium "
                >
                  <div className="flex border-b">ورود</div>{" "}
                  <span className="flex">ثبت نام</span>
                </button>
              ) : (
                <div
                  id="user-profile"
                  className="inline-flex justify-end w-full z-[2]"
                >
                  <button
                    className={` inline-flex rounded-xl   ${
                      drop === true ? "z-[101]" : ""
                    }`}
                  >
                    <div
                      className={`flex ${
                        !drop ? "text-ino-primary" : "text-ino-gray"
                      } `}
                    >
                      <FaUserCheck
                        // color={`${!drop ? "#48424966" : "#ffffff"}`}
                        size={20}
                      />
                    </div>
                    <span
                      className={`-mr-8 mt-6 inline-flex items-center justify-center px-2 py-1 text-[8px] font-bold leading-none text-gray-600 bg-transparent rounded-full ${
                        drop ? "text-white " : "text-gray-600"
                      }`}
                    >
                      {userInfo?.firstname !== ""
                        ? userInfo?.firstname
                        : userInfo?.usernamebyphone}
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>{signInFlag}</>
          )}
        </button>
        <div
          className={`hidden md:flex flex-wrap rounded-lg fixed transition-all z-[102] bg-white translate-y-8 translate-x-[14px] w-[400px] ${
            drop ? "h-[500px] flex p-[16px]" : " overflow-hidden h-[0px]"
          }`}
        >
          <span className="w-full text-start mx-2 font-Vazir-Bold text-sky-600">
            پروفایل
          </span>
          <div className="flex h-[70%] p-2 rounded-xl bg-ino-white overflow-y-auto  items-start justify-center w-full">
            <div
              // ref={animationParent}
              className="flex flex-wrap h-fit items-start justify-center w-full"
            ></div>
          </div>
          <div>
            <Link
              href={"/checkout/cart"}
              className="flex h-fit mb-2 px-4 rounded-lg bg-ino-primary hover:bg-ino-dark text-white hover:text-white self-end text-md font-Vazirmatn font-bold 	p-2"
            >
              تغییر مشخضات
            </Link>
          </div>
        </div>
      </div>
      <div
        id="user-container-mobile"
        onTouchEnd={() => {
          setDrop(true);
        }}
        onClick={() => {
          setDrop(true);
        }}
        className="justify-end md:hidden flex"
      >
        <button
          className={`md:hidden rounded-xl  ${
            !drop ? "text-ino-hgray" : "text-ino-hgray"
          } `}
        >
          {signInFlag !== "idle" ? (
            <>
              {signInFlag !== "success" ? (
                <button
                  onClick={() => {
                    router.push("/client/login");
                  }}
                  className="flex flex-wrap border rounded-xl p-2 text-xs md:text-sm font-Vazir-Medium "
                >
                  <div className="flex border-b">ورود</div>{" "}
                  <span className="flex">ثبت نام</span>
                </button>
              ) : (
                <div
                  id="user-profile"
                  className="inline-flex justify-end w-full z-[2]"
                >
                  <button
                    className={` inline-flex rounded-xl   ${
                      drop === true ? "z-[101]" : ""
                    }`}
                  >
                    <div
                      className={`flex ${
                        !drop ? "text-ino-hgray" : "text-ino-gray"
                      } `}
                    >
                      <FaUserCheck
                        // color={`${!drop ? "#48424966" : "#ffffff"}`}
                        size={20}
                      />
                    </div>
                    <span
                      className={`-mr-8 mt-6 inline-flex items-center justify-center px-2 py-1 text-[8px] font-bold leading-none text-gray-600 bg-transparent rounded-full ${
                        drop ? "text-white " : "text-gray-600"
                      }`}
                    >
                      {userInfo?.firstname !== ""
                        ? userInfo?.firstname
                        : userInfo?.usernamebyphone}
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>{signInFlag}</>
          )}
        </button>
      </div>
      <div
        className={`md:hidden flex flex-wrap fixed z-[101] bg-white right-0 top-0 h-[100%] w-[100%] ${
          drop ? "flex" : "hidden"
        }`}
      >
        <div className="flex h-fit w-full justify-end p-2 text-ino-primary">
          <div
            onClick={() => {
              setDrop(false);
            }}
            className="flex p-2 cursor-pointer"
          >
            <AiFillCloseSquare size={30} />
          </div>
        </div>
        <div className="flex flex-wrap items-start h-full rounded-xl mx-2 bg-ino-white w-full overflow-hidden">
          <span className="w-full text-[20px] text-start  mx-2 font-Vazir-Bold text-pink-600">
            پروفایل
          </span>
          <div className="flex h-[70%] p-2 rounded-xl bg-ino-white overflow-y-auto  items-start justify-center w-full"></div>
          <div>
            <Link
              href={"/client/profile"}
              className="flex h-fit mb-2 px-4 rounded-lg bg-ino-primary hover:bg-ino-dark text-white hover:text-white self-end text-md font-Vazirmatn font-bold 	p-2"
            >
              تغییر مشخضات
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
// return (
//   <>
//     <div
//       style={{
//         transition: `${
//           drop === true
//             ? "opacity 200ms ease-in-out"
//             : "opacity 200ms ease-in-out"
//         }`,
//         opacity: `${drop === true ? "100%" : "0%"}`,
//         width: `${drop === true ? "100%" : "0%"}`,
//         height: `${drop === true ? "100%" : "0%"}`,
//       }}
//       onTouchStart={() => {
//         // setDrop(false);
//         setTimeout(() => setDrop(false), timeout);
//       }}
//       onClick={() => {
//         // setDrop(false);
//         setTimeout(() => setDrop(false), timeout);
//       }}
//       className="fixed top-0 left-0 z-[100] w-[100%] h-[100%] bg-black/20"
//     ></div>

//     <div className={` w-1/2 ${drop ? "z-[101]" : ""} `}>
//       {userCheck === undefined ? (
//         <Link href="/client/login">
//           <button className="flex flex-wrap border rounded-xl p-1 text-xs md:text-sm font-Vazir-Medium ">
//             <div className="flex border-b">ورود</div>{" "}
//             <span className="flex">ثبت نام</span>
//           </button>
//         </Link>
//       ) : (
//         <div
//           id="user-profile"
//           ref={profileElement}
//           onMouseEnter={() => {
//             if (mobileCheck === "mobile") {
//             } else {
//               setTimeout(() => setDrop(true), timeout);
//             }
//           }}
//           onClick={() => {
//             if (mobileCheck === "mobile") {
//               if (drop) setTimeout(() => setDrop(false), timeout);
//               else setTimeout(() => setDrop(true), timeout);
//             } else {
//               setTimeout(() => setDrop(true), timeout);
//             }
//           }}
//           onMouseLeave={() => {
//             if (mobileCheck === "mobile") {
//             } else {
//               setTimeout(() => setDrop(false), timeout);
//             }
//             // setDrop(false);
//           }}
//           className="inline-flex justify-end w-full z-[2]"
//         >
//           <button
//             className={` inline-flex rounded-xl px-6 p-4 ${
//               drop === true ? "z-[101]" : ""
//             }`}
//           >
//             <div
//               className={`flex ${
//                 !drop ? "text-ino-hgray" : "text-ino-gray"
//               } `}
//             >
//               <FaUserCheck
//                 // color={`${!drop ? "#48424966" : "#ffffff"}`}
//                 size={20}
//               />
//             </div>
//             <span
//               className={`-mr-8 mt-6 inline-flex items-center justify-center px-2 py-1 text-[8px] font-bold leading-none text-gray-600 bg-transparent rounded-full ${
//                 drop ? "text-white " : "text-gray-600"
//               }`}
//             >
//               {userInfo?.firstname}
//             </span>
//           </button>
//           <div
//             style={{
//               transition: "all 300ms ease-in-out",
//               opacity: `${drop === true ? "100%" : "0%"}`,
//               width: `${drop === true ? "300px" : "0%"}`,
//               height: `${drop === true ? "300px" : "0%"}`,
//               zIndex: "2",
//             }}
//             className={`md:left-[20%] lg:loft-[225px] left-0 fixed mt-[30px] pt-4  ml-[0px] flex flex-wrap bg-transparent  overflow-hidden`}
//           >
//             <div className="flex flex-wrap border border-t-0 rounded-xl mx-4 bg-ino-white h-full w-full ">
//               <div className="flex flex-wrap h-3/4 mt-2 overflow-y-scroll">
//                 <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
//                   <span className="mx-2">نام :</span>
//                   {userInfo.firstname}
//                 </div>
//                 <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
//                   <span className="mx-2">نام خانوادگی :</span>
//                   {userInfo.lastname}
//                 </div>
//                 <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
//                   <span className="mx-2">شماره :</span>
//                   {0}
//                   {userInfo.usernamebyphone}
//                 </div>
//                 <div className="flex flex-wrap justify-start p-4 w-full h-4 font-Vazir-Medium">
//                   <span className="m-2">آدرس انتخابی :</span>
//                   {
//                     userInfo?.addresses?.[userInfo?.PrimaryAddressNumber ?? 0]
//                       ?.address_compact
//                   }
//                 </div>
//               </div>
//               <div className="flex p-2">
//                 <div>
//                   <button
//                     onClick={() => {
//                       dispatch(removeProfile());
//                       setDrop(false);
//                     }}
//                     className=" m-2  p-2 rounded-md bg-blackout-red text-white text-sm font-Vazir-Medium"
//                   >
//                     خروج از حساب
//                   </button>
//                 </div>

//                 <Link href={"/client/profile"}>
//                   <button className="m-2  p-2 rounded-md bg-wipro-blue text-white text-sm font-Vazir-Medium">
//                     مشاهده پروفایل
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </>
// );
