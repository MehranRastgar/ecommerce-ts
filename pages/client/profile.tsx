import { useState, useContext, useEffect, useRef } from "react";
// import ButtonTimer from "src/components/buttonTimer/buttonTimer.js";
// import { REGISTER_ENDPOINTS } from "/src/utils/constants/endpoints";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Router, { useRouter } from "next/router";
// import Landing from "layouts/Landing";
import sadImage from "public/android-chrome-512x512.png";
import Image from "next/image";
// import UserContext from "src/components/userContext";
// import UserManagement from "src/classes/UserManagement";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  selectSignInFlag,
  signInRequest,
  signInRequestAsync,
  signInAction,
  setMobileNumber,
  selectMobileNumber,
} from "../../src/store/slices/clientSlice";
import { OtpRequest, SignInRequest } from "../../src/types/types";
import LoadingOne from "../../src/components/loader/default";
import useSWR from "swr";
import { Search } from "..";
import { selectUserInfo } from "../../src/store/slices/orderSlice";
import Layout from "../../src/components/Layout";

type TypeField = {
  farsiname: string;
  nestedData: string;
  type: string;
  disabled?: boolean;
};

const Form: TypeField[] = [
  {
    farsiname: "شماره موبایل",
    nestedData: "usernamebyphone",
    type: "tell",
    disabled: true,
  },
  { farsiname: "نام", nestedData: "firstname", type: "text" },
  { farsiname: "نام خانوادگی", nestedData: "firstname", type: "text" },
];

export default function ProfilePage() {
  const UserInfo = useAppSelector(selectUserInfo);

  return (
    <>
      <Layout>
        <div className="flex m-2 justify-center p-[16px]w-full font-Vazir-Medium">
          <div className="flex md:w-[700px] w-full">
            <ul className="flex h-fit flex-wrap w-auto   rounded-lg p-[16px]">
              {Form?.map((item, index) => (
                <>
                  <li className="flex w-fit m-2">
                    <label className="flex mx-2 my-1 p-1">
                      {item.farsiname}
                    </label>
                  </li>
                </>
              ))}
            </ul>
            <ul className="flex h-fit flex-wrap w-2/3 rounded-lg p-[16px]">
              {Form?.map((item, index) => (
                <>
                  <li className="flex w-full m-2">
                    <input
                      disabled={item?.disabled !== undefined ? true : false}
                      className="rounded-md border p-1"
                      defaultValue={eval(`UserInfo?.${item.nestedData}`)}
                    />
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
