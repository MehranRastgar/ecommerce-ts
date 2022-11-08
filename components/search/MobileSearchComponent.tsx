import { useEffect, useRef, useState } from "react";
import { FaSearchengin, FaUserCheck, FaUserAltSlash } from "react-icons/fa";
import { BsForwardFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import MobileUserBag from "../cart/MobileUserBag";
import { Client } from "../../src/types/types";
import { useAppSelector } from "../../src/store/hooks";
import { selectUserInfo } from "../../src/store/slices/clientSlice";
import Link from "next/link";

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
  const [drop, setDrop] = useState<boolean>(false);
  const profileElement = useRef<HTMLDivElement>(null);
  const numb: string | undefined = String(
    document?.getElementById("user-profile")?.offsetLeft
  );

  useEffect(() => {
    setUserCheck(userInfo?.firstname);
  }, [userInfo?.firstname, numb]);
  return (
    <div className="w-1/2">
      {userCheck === undefined ? (
        <Link href="/client/login">
          <button className="flex flex-wrap border rounded-xl p-1 text-xs md:text-sm font-Vazir-Medium ">
            <div className="flex border-b">ورود</div>{" "}
            <span className="flex">ثبت نام</span>
          </button>
        </Link>
      ) : (
        <Link href={"/client/profile"}>
          <div
            id="user-profile"
            ref={profileElement}
            onMouseEnter={() => {
              setDrop(true);
            }}
            onMouseLeave={() => {
              setDrop(false);
            }}
            className="inline-flex justify-end w-full"
          >
            <button className="inline-flex p-2">
              <div className="flex">
                <FaUserCheck color="#48424966" size={30} />
              </div>
              <span className="-mr-8 mt-6 inline-flex items-center justify-center px-2 py-1 text-[8px] font-bold leading-none text-gray-600 bg-transparent rounded-full">
                {userInfo?.firstname}
              </span>
            </button>
            <div
              style={{
                transition: "all 300ms ease-in-out",
                width: `${drop === true ? "300px" : "0%"}`,
                height: `${drop === true ? "300px" : "0%"}`,
                zIndex: "2",
              }}
              className={`fixed mt-[30px] pt-4  ml-[0px] flex w-[300px] bg-transparent h-[300px] z-50 overflow-hidden`}
            >
              <div className="border border-t-0 rounded-xl mx-4 bg-white h-full w-full ">
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
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
