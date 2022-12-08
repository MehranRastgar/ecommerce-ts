import {
  useState,
  useContext,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
// import ButtonTimer from "src/components/buttonTimer/buttonTimer.js";
// import { REGISTER_ENDPOINTS } from "/src/utils/constants/endpoints";
import axios from "axios";
import Router, { useRouter } from "next/router";
// import Landing from "layouts/Landing";
import sadImage from "public/android-chrome-512x512.png";
import Image from "next/image";
// import UserContext from "src/components/userContext";
// import UserManagement from "src/classes/UserManagement";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
import LoadingOne from "../../components/loader/default";

// import { useCookies } from "react-cookie";

// const UserM = new UserManagement();

const inputStyle = "flex flex-wrap w-8/12 justify-center border ";
const listStyle =
  "flex flex-wrap-row w-11/12 justify-center border bg-ino-white m-2 p-2";
const parentStyle = "flex flex-wrap w-6/12 justify-center border bg-white";
const formStyle = "flex flex-wrap w-11/12 justify-center border bg-wipro-blue";
const aStyle = "mx-5";

export default function Login() {
  const dipatch = useAppDispatch();
  const signInFlag = useAppSelector(selectSignInFlag);
  const SelectMobile = useAppSelector(selectMobileNumber);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [returnUrl, setReturnUrl] = useState<string | undefined>(undefined);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const phone = useRef<string>();

  async function loginUser() {
    console.log("please write code", SelectMobile);

    if (otpCode !== 0 && SelectMobile !== undefined) {
      const signIn: SignInRequest = {
        code: otpCode,
        usernamebyphone: SelectMobile,
      };
      console.log("please write code", signIn.usernamebyphone);

      dipatch(signInAction(signIn)); //signIn api call
    } else {
      console.log("please write code");
    }
  }
  async function sendOtp() {
    if (isValid(phoneNumber)) {
      const signIn: OtpRequest = {
        usernamebyphone: Number(phoneNumber),
      };
      console.log(signIn);
      setIsLoading(true);
      setErrorMessage("");
      dipatch(signInRequestAsync(signIn)); //otp api call
      dipatch(setMobileNumber(signIn.usernamebyphone));
    } else {
      console.log("invalid number");
      console.log(phoneNumber);
      setErrorMessage("شماره وارد شده صحیح نمیباشد");
      setIsLoading(false);
    }
  }

  function isValid(p: string) {
    var phoneRe = /^[0-9]\d{3}[0-9]\d{2}\d{4}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
  }

  function handleClick(e: KeyboardEvent<HTMLDivElement>) {
    if (e?.key === "Enter") {
      loginUser();
    }
  }
  useEffect(() => {
    console.log("signInFlag====>", signInFlag);
    if (signInFlag === "smsWaiting") {
      setIsLoading(false);
      setIsSuccess(true);
    }
    if (signInFlag === "idle") {
      setIsLoading(false);
    }
    if (signInFlag !== "loading") {
      setIsLoading(false);
    }
    if (errorMessage.length > 3) {
      if (isValid(phoneNumber)) {
        setErrorMessage("فرمت شماره صحیح مبباشد");
      } else {
        setErrorMessage("شماره وارد شده صحیح نمیباشد");
      }
    }
    if (signInFlag === "success") {
      setTimeout(() => {
        if (router.query.returnUrl !== undefined) {
          Router.push(`/${returnUrl}`);
        } else {
          Router.push(`/`);
        }
      }, 1500);
    }
    if (typeof router?.query?.returnUrl === "string")
      setReturnUrl(router?.query?.returnUrl);
  }, [signInFlag, isLoading, phoneNumber]);

  return (
    <>
      <Head>
        <meta property="og:title" content="ورود / ثبت نام" key="title" />
        <title>ورود / ثبت نام</title>
        <meta name="description" content=""></meta>
      </Head>
      <section className="flex bg-ino-lwhite justify-center min-h-screen h-full gradient-form items-center  w-full md:h-screen">
        <div className="bg-white/30 max-w-[400px] border m-2 mt-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/3 3xl:w-1/4 rounded-xl shadow-lg overflow-hidden h-fit  font-Vazir-Medium">
          <header className="p-4 flex justify-center w-full bg-ino-gray border-b  text-xl text-white text-center">
            ثبت نام / ورود
          </header>
          {signInFlag === "request" || signInFlag === "smsWaiting" ? (
            <>
              <div>
                <div className="m-4 p-5 flex  text-xl text-black text-center">
                  کد اعتبار سنجی برای شما ارسال شد در صورت دریافت وارد نمایید
                </div>
                <div className=" flex flex-wrap justify-center w-full ">
                  <div className="m-4 mb-0 pb-0 p-3 flex w-full justify-center center text-center   ">
                    {phoneNumber}
                  </div>
                  {/* <input
                    onChange={(e) => {
                      setOtpCode(Number(e.target.value));
                    }}
                    type="string"
                    className="m-4 p-3 w-1/2 rounded-lg border flex justify-center rtl"
                    placeholder="******"
                    id="code"
                  ></input> */}
                  <TextField
                    autoComplete="off"
                    id="code"
                    label="رمز یکبار مصرف"
                    variant="outlined"
                    // pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                    onKeyDown={(e) => {
                      handleClick(e);
                    }}
                    onChange={(e) => setOtpCode(Number(e?.target?.value))}
                    type={"tel"}
                    className=" bg-white my-4 rtl"
                    placeholder="****"
                  />
                  <div className="flex justify-center w-full">
                    <button
                      onClick={(event) => {
                        // setIsLoading(true);
                        loginUser();
                      }}
                      className=" mb-4 rounded-lg p-4  text-white bg-ino-primary text-xl"
                    >
                      تایید
                    </button>
                    {signInFlag === "smsWaiting" ? <LoadingOne /> : ""}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {signInFlag === "idle" || signInFlag === "faild" ? (
            <>
              <div>
                <div className=" m-4 p-5 flex  text-xl text-blackout-black text-center">
                  جهت ثبت نام یا ورود شماره موبایل خود را وارد کنید
                </div>
                <div className="m-4 p-5 flex  text-lg text-ino-lgray text-center">
                  و در ادامه کد پیامک شده را وارد نمایید
                </div>
                <div className=" flex flex-wrap justify-center w-full ">
                  <div className="m-4 mb-0 pb-0 p-3 flex w-full justify-center center text-center   "></div>
                  {/* <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    autoComplete="off"
                  > */}
                  <TextField
                    autoComplete="off"
                    id="phoneNumber"
                    label="شماره موبایل"
                    variant="outlined"
                    // pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsLoading(true);
                        sendOtp();
                      }
                    }}
                    type={"tel"}
                    className=" bg-white my-4"
                    placeholder="*******0912"
                  />
                  {/* </Box> */}
                  {/* <input
                    // ref={phone}
                    pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="phoneNumber"
                    type={"tel"}
                    className="  m-4 p-3 w-1/2 rounded-lg border flex justify-center rtl"
                    placeholder="*******0912"
                  ></input> */}
                  <div className="flex justify-center w-full">
                    <button
                      onClick={(event) => {
                        setIsLoading(true);
                        sendOtp();
                      }}
                      className=" mb-4 rounded-lg p-4  text-white bg-ino-primary text-xl"
                    >
                      {isLoading ? <LoadingOne /> : "دریافت کد"}
                    </button>
                  </div>
                  <div
                    className={
                      errorMessage === "فرمت شماره درست مبباشد"
                        ? "text-wipro-green"
                        : "text-blackout-red"
                    }
                  >
                    {errorMessage}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {signInFlag === "success" ? (
            <>
              <div className="h-48 bg-slate-900 text-brand-green p-5 flex justify-center items-center text-3xl text-center">
                ورود موفقیت آمیز!
              </div>
            </>
          ) : (
            <></>
          )}

          {signInFlag === "loading" ? (
            <>
              <div className="h-48 bg-slate-900 text-brand-green p-5 flex justify-center items-center text-3xl text-center">
                {<LoadingOne />}
              </div>
            </>
          ) : (
            <></>
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
