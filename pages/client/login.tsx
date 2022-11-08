import { useState, useContext, useEffect } from "react";
// import ButtonTimer from "src/components/buttonTimer/buttonTimer.js";
// import { REGISTER_ENDPOINTS } from "/src/utils/constants/endpoints";
import axios from "axios";
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
} from "../../src/store/slices/clientSlice";
import { OtpRequest } from "../../src/types/types";
// import { useCookies } from "react-cookie";

// const UserM = new UserManagement();

const inputStyle = "flex flex-wrap w-8/12 justify-center border ";
const listStyle =
  "flex flex-wrap-row w-11/12 justify-center border bg-white m-2 p-2";
const parentStyle = "flex flex-wrap w-6/12 justify-center border bg-white";
const formStyle = "flex flex-wrap w-11/12 justify-center border bg-wipro-blue";
const aStyle = "mx-5";

export default function Login() {
  const dipatch = useAppDispatch();
  const signInFlag = useAppSelector(selectSignInFlag);
  //   const {
  //     user: [user],
  //     CART: [CART],
  //     useAlert: [useAlert, setUseAlert],
  //   } = useContext(UserContext);

  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [returnUrl, setReturnUrl] = useState<string>();
  const [loadingLogin, setLoadingLogin] = useState(false);
  // const [cookies, setCookie] = useCookies(["access_token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const AlertCreator = async () => {
    // setUseAlert({
    //   alert: true,
    //   color: "green",
    //   message: "این قسمت به زودی فعال میشود",
    //   title: " ",
    // });
  };

  async function sendOtp() {
    // alert(`So your name is ${document.getElementById("phoneNumber").value}?`);
    const getConfig = {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "*/*",
      },
    };

    const PhoneNum: HTMLElement | null =
      document?.getElementById("phoneNumber");
    if (PhoneNum?.value !== null && PhoneNum?.value !== undefined)
      setPhoneNumber(PhoneNum?.value);

    if (isValid(phoneNumber)) {
      // let resp = await axios.get(OTPuri, getConfig);
      const signIn: OtpRequest = {
        usernamebyphone: Number(phoneNumber),
      };
      console.log(signIn);
      dipatch(signInRequestAsync(signIn));
    } else {
      console.log("invalid number");
      console.log(phoneNumber);

      setIsLoading(false);
    }
  }
  function isValid(p: string) {
    var phoneRe = /^[0-9]\d{3}[0-9]\d{2}\d{4}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
  }
  useEffect(() => {
    console.log("signInFlag====>", signInFlag);
    if (signInFlag === "success") {
      setIsLoading(false);
      setIsSuccess(true);
    }
    if (signInFlag === "idle") {
      setIsLoading(false);
    }
    if (signInFlag !== "loading") {
      setIsLoading(false);
    }
    // setReturnUrl(router?.query?.returnUrl ?? "/");
  }, [signInFlag, isLoading]);

  return (
    <>
      <Head>
        <meta property="og:title" content="ورود / ثبت نام" key="title" />
        <title>ورود / ثبت نام</title>
        <meta name="description" content=""></meta>
      </Head>
      <section className="flex justify-center min-h-screen h-full gradient-form items-center bg-white w-full md:h-screen">
        <div className="border m-2 mt-20 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/3 3xl:w-1/4 rounded-xl shadow-lg overflow-hidden h-fit -translate-y-36 ">
          <header className="p-4 flex justify-center w-full bg-cyan-400 border-b font-bold font-Vazirmatn text-3xl text-white text-center">
            ثبت نام / ورود
          </header>
          {!isSuccess ? (
            <>
              <div className="m-4 p-5 flex font-bold font-Vazirmatn text-xl text-black text-center">
                جهت ثبت نام یا ورود شماره موبایل خود را وارد کنید
              </div>
              <div className="m-4 p-5 flex font-bold font-Vazirmatn text-lg text-gray-400 text-center">
                و در ادامه کد پیامک شده را وارد نمایید
              </div>
              <div className=" flex flex-wrap justify-center w-full ">
                <div className="m-4 mb-0 pb-0 p-3 flex w-full justify-center center text-center  font-bold font-Vazirmatn ">
                  فقط شماره موبایل{" "}
                </div>
                <input
                  pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                  id="phoneNumber"
                  type={"tel"}
                  className="  m-4 p-3 w-1/2 rounded-lg border flex justify-center rtl"
                  placeholder="*******0912"
                ></input>
                <div className="flex justify-center w-full">
                  <button
                    onClick={(event) => {
                      setIsLoading(true);
                      sendOtp();
                    }}
                    className=" mb-4 rounded-lg p-4 font-bold font-Vazirmatn text-white bg-cyan-400 text-xl"
                  >
                    {isLoading ? loadingSvg : "دریافت کد"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="m-4 p-5 flex font-bold font-Vazirmatn text-xl text-black text-center">
                کد اعتبار سنجی برای شما ارسال شد در صورت دریافت وارد نمایید
              </div>
              <div className=" flex flex-wrap justify-center w-full ">
                <div className="m-4 mb-0 pb-0 p-3 flex w-full justify-center center text-center  font-bold font-Vazirmatn ">
                  {phoneNumber}
                </div>
                <input
                  type="string"
                  className="  m-4 p-3 w-1/2 rounded-lg border flex justify-center rtl"
                  placeholder="******"
                  id="code"
                ></input>
                <div className="flex justify-center w-full">
                  <button
                    onClick={(event) => {
                      setIsLoading(true);
                      loginUser();
                    }}
                    className=" mb-4 rounded-lg p-4 font-bold font-Vazirmatn text-white bg-cyan-400 text-xl"
                  >
                    تایید
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
