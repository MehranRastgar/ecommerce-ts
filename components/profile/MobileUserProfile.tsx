import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  removeProfile,
  selectUserInfo,
} from "../../src/store/slices/clientSlice";
import { selectDeviceType } from "../../src/store/slices/themeSlice";
import { Client } from "../../src/types/types";

export default function MobileUserProfile() {
  const [userCheck, setUserCheck] = useState<string | undefined>(undefined);

  const userInfo: Client = useAppSelector(selectUserInfo);
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
  const timeout: number = 200;

  return (
    <>
      <div
        style={{
          transition: `${
            drop === true
              ? "opacity 800ms ease-in-out"
              : "opacity 800ms ease-in-out"
          }`,
          opacity: `${drop === true ? "100%" : "0%"}`,
          width: `${drop === true ? "100%" : "0%"}`,
          height: `${drop === true ? "100%" : "0%"}`,
        }}
        onTouchStart={() => {
          // setDrop(false);
          setTimeout(() => setDrop(false), timeout);
        }}
        onClick={() => {
          // setDrop(false);
          setTimeout(() => setDrop(false), timeout);
        }}
        className="fixed top-0 left-0 z-[100] w-[100%] h-[100%] bg-black/60"
      ></div>

      <div className={`w-1/2 ${drop ? "z-[101]" : ""} `}>
        {userCheck === undefined ? (
          <Link href="/client/login">
            <button className="flex flex-wrap border rounded-xl p-1 text-xs md:text-sm font-Vazir-Medium ">
              <div className="flex border-b">ورود</div>{" "}
              <span className="flex">ثبت نام</span>
            </button>
          </Link>
        ) : (
          <div
            id="user-profile"
            ref={profileElement}
            onMouseEnter={() => {
              if (mobileCheck === "mobile") {
              } else {
                setTimeout(() => setDrop(true), timeout);
              }
            }}
            onClick={() => {
              if (mobileCheck === "mobile") {
                if (drop) setTimeout(() => setDrop(false), timeout);
                else setTimeout(() => setDrop(true), timeout);
              } else {
                setTimeout(() => setDrop(true), timeout);
              }
            }}
            onMouseLeave={() => {
              if (mobileCheck === "mobile") {
              } else {
                setTimeout(() => setDrop(false), timeout);
              }
              // setDrop(false);
            }}
            className="inline-flex justify-end w-full z-[2]"
          >
            <button
              className={` inline-flex rounded-xl px-6 p-4 ${
                drop === true ? "z-[101]" : ""
              }`}
            >
              <div className="flex">
                <FaUserCheck
                  color={`${!drop ? "#48424966" : "#ffffff"}`}
                  size={20}
                />
              </div>
              <span
                className={`-mr-8 mt-6 inline-flex items-center justify-center px-2 py-1 text-[8px] font-bold leading-none text-gray-600 bg-transparent rounded-full ${
                  drop ? "text-white " : "text-gray-600"
                }`}
              >
                {userInfo?.firstname}
              </span>
            </button>
            <div
              style={{
                transition: "all 300ms ease-in-out",
                opacity: `${drop === true ? "100%" : "0%"}`,
                width: `${drop === true ? "300px" : "0%"}`,
                height: `${drop === true ? "300px" : "0%"}`,
                zIndex: "2",
              }}
              className={`md:left-[20%] lg:loft-[225px] left-0 fixed mt-[30px] pt-4  ml-[0px] flex flex-wrap bg-transparent  overflow-hidden`}
            >
              <div className="flex flex-wrap border border-t-0 rounded-xl mx-4 bg-white h-full w-full ">
                <div className="flex flex-wrap h-3/4 mt-2 overflow-y-scroll">
                  <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
                    <span className="mx-2">نام :</span>
                    {userInfo.firstname}
                  </div>
                  <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
                    <span className="mx-2">نام خانوادگی :</span>
                    {userInfo.lastname}
                  </div>
                  <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
                    <span className="mx-2">شماره :</span>
                    {0}
                    {userInfo.usernamebyphone}
                  </div>
                  <div className="flex flex-wrap justify-start p-4 w-full h-4 font-Vazir-Medium">
                    <span className="m-2">آدرس انتخابی :</span>
                    {
                      userInfo?.addresses?.[userInfo?.PrimaryAddressNumber ?? 0]
                        ?.address_compact
                    }
                  </div>
                </div>
                <div className="flex p-2">
                  <div>
                    <button
                      onClick={() => {
                        dispatch(removeProfile());
                        setDrop(false);
                      }}
                      className=" m-2  p-2 rounded-md bg-blackout-red text-white text-sm font-Vazir-Medium"
                    >
                      خروج از حساب
                    </button>
                  </div>

                  <Link href={"/client/profile"}>
                    <button className="m-2  p-2 rounded-md bg-wipro-blue text-white text-sm font-Vazir-Medium">
                      مشاهده پروفایل
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
