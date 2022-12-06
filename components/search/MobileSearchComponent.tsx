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
import { GoSearch } from "../headers/header";
import MobileUserProfile from "../profile/MobileUserProfile";

export default function MobileSearchComponent() {
  return (
    <div className="md:hidden flex px-3 bg-ino-lwhite">
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
        className="flex items-center w-2/3 p-2 rounded-xl m-2 h-[50px] bg-ino-white"
      >
        <FaSearchengin
          // color={`${searchModal === true ? "" : "#e61f37"}`}
          size={30}
        />
        {/* <input  className='flex w-5/6 p-1 bg-transparent m-1 h-full border-none focus:'></input> */}
      </div>
      {searchModal === true ? (
        <SearchModal
          setSearchModal={setSearchModal}
          searchModal={searchModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}

function SearchModal({
  setSearchModal,
  searchModal,
}: {
  setSearchModal: any;
  searchModal: any;
}) {
  const [searchString, setSearchString] = useState<string>("");

  function enterChecker(key: string) {
    setSearchModal(true);

    if (key === "Enter" || key === "Escape") {
      GoSearch(searchString);
      setSearchModal(false);
    }
  }
  return (
    <div className="fixed justify-start h-[100%] flex  top-0 right-0 w-full bg-ino-white z-[130]">
      <div className="flex w-full mx-3 border-b-2 border-sky-400 p-2 h-fit text-sky-600">
        <BsForwardFill onClick={() => setSearchModal(false)} size={40} />
        <input
          type={"search"}
          placeholder={"جستجو"}
          style={{
            transition: "height 1.2s ease-in-out",
            outlineStyle: "none",
          }}
          onKeyDown={(e) => enterChecker(e?.key ?? "nothing")}
          onChange={(e) => setSearchString(e.target.value)}
          className={`flex w-full focus:w-full  h-[40px] bg-transparent p-2 text-slate-600  ${
            searchModal === true ? "rounded-b-none z-[2]" : ""
          }`}
        ></input>
      </div>
    </div>
  );
}

export function MobileUserTwinComponent() {
  return (
    <div className="flex justify-end md:justify-center w-fit md:w-full items-center  mx-2">
      <div className="flex overflow-hidden max-w-[250px] items-center  mx-2 font-thin">
        <MobileUserProfile />
        <div className="mx-2 border border-r-1 h-[50px]"></div>
        <MobileUserBag />
      </div>
    </div>
  );
}
