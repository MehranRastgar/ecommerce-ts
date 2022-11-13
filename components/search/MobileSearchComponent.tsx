import { useEffect, useRef, useState } from "react";
import { FaSearchengin, FaUserCheck, FaUserAltSlash } from "react-icons/fa";
import { BsForwardFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import MobileUserBag from "../cart/MobileUserBag";
import { Client } from "../../src/types/types";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  removeProfile,
  selectUserInfo,
} from "../../src/store/slices/clientSlice";
import Link from "next/link";
import {
  selectDeviceType,
  ThemeState,
} from "../../src/store/slices/themeSlice";

export default function MobileSearchComponent() {
  return (
    <div className="flex mx-3">
      <MobileSearchBar />
      <MobileUserTwinComponent />
    </div>
  );
}

export function MobileSearchBar() {
  const [searchModal, setSearchModal] = useState<boolean>(false);
  // const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => setSearchModal(true)}
        className="flex items-center w-2/3 p-2 rounded-xl m-2  bg-gray-200 h-[50px] "
      >
        <FaSearchengin
          color={`${searchModal === true ? "" : "#e61f37"}`}
          size={30}
        />
        {/* <input  className='flex w-5/6 p-1 bg-transparent m-1 h-full border-none focus:'></input> */}
      </div>
      {searchModal === true ? (
        <SearchModal setSearchModal={setSearchModal} />
      ) : (
        <></>
      )}
    </>
  );
}

function SearchModal({ setSearchModal }: { setSearchModal: any }) {
  return (
    <div className="justify-start flex absolute top-0 right-0 w-full h-full bg-white z-[3]">
      <div className="flex w-full mx-3 border-b-2 border-[#f99e23] p-2 h-fit">
        <BsForwardFill
          onClick={() => setSearchModal(false)}
          color="#e61f37"
          size={40}
        />
        <input
          placeholder="جستجو"
          className="p-2 m-2 cursor-pointer h-fit"
        ></input>
      </div>
    </div>
  );
}

export function MobileUserTwinComponent() {
  return (
    <div className="flex justify-center xl:max-w-[400px] lg:max-w-[300px] md:max-w-[200px] max-w-[100px] w-full items-center  mx-2">
      <div className="flex max-w-[150px] items-center  mx-2 font-thin">
        <MobileUserProfile />
        <div className="mx-2 border border-r-1 h-[50px]"></div>
        <MobileUserBag />
      </div>
    </div>
  );
}

function MobileUserProfile() {
  const [userCheck, setUserCheck] = useState<string | undefined>(undefined);

  const userInfo: Client = useAppSelector(selectUserInfo);
  // const mobileCheck = useAppSelector(selectDeviceType);

  const dispatch = useAppDispatch();
  const [drop, setDrop] = useState<boolean>(false);
  const profileElement = useRef<HTMLDivElement>(null);
  const numb: string | undefined = String(
    document?.getElementById("user-profile")?.offsetLeft
  );

  useEffect(() => {
    setUserCheck(userInfo?.firstname);
  }, [userInfo?.firstname, numb]);
  const timeout: number = 200;

  return (
    <>
      <div
        style={{
          transition: `${
            drop === true ? "opacity 800ms ease-in-out" : "all 300ms ease-in"
          }`,
          opacity: `${drop === true ? "100%" : "0%"}`,
          width: `${true === true ? "100%" : "0%"}`,
          height: `${drop === true ? "100%" : "0%"}`,
        }}
        onTouchStart={() => {
          setTimeout(() => setDrop(false), timeout);
          // setDrop(false);
        }}
        className="fixed top-0 left-0 z-[3] bg-black/60"
      ></div>

      <div className="w-1/2 z-[50] ">
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
              // setDrop(true);
              setTimeout(() => setDrop(true), timeout);
            }}
            onTouchStart={() => {
              // setDrop(true);
              setTimeout(() => setDrop(true), timeout);
            }}
            onMouseLeave={() => {
              setTimeout(() => setDrop(false), timeout);
              // setDrop(false);
            }}
            className="inline-flex justify-end w-full z-[2]"
          >
            <button className="inline-flex p-2">
              <div className="flex">
                <FaUserCheck
                  color={`${!drop ? "#48424966" : "#ffffff"}`}
                  size={20}
                />
              </div>
              <span className="-mr-8 mt-6 inline-flex items-center justify-center px-2 py-1 text-[8px] font-bold leading-none text-gray-600 bg-transparent rounded-full">
                {userInfo?.firstname}
              </span>
            </button>
            <div
              style={{
                transition: "all 300ms ease-in-out",
                opacity: `${drop === true ? "100%" : "0%"}`,
                width: `${true === true ? "300px" : "0%"}`,
                height: `${drop === true ? "300px" : "0%"}`,
                zIndex: "2",
              }}
              className={`fixed mt-[30px] pt-4  ml-[0px] flex flex-wrap w-[300px] bg-transparent h-[300px] z-[3] overflow-hidden`}
            >
              <div className="flex flex-wrap border border-t-0 rounded-xl mx-4 bg-white h-full w-full ">
                <div className="flex flex-wrap h-3/4 overflow-y-scroll">
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
                      userInfo?.addresses?.[userInfo.PrimaryAddressNumber ?? 0]
                        .address_compact
                    }
                  </div>
                </div>
                <div className="flex p-2">
                  <div>
                    <button
                      onClick={() => {
                        dispatch(removeProfile());
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
