import axios, { AxiosError, AxiosResponse } from "axios";
import { Client } from "../../../src/types/types";

export async function fetchClient(
  clientId: string
): Promise<Client | { error: { errorCode: any } }> {
  let clientid = localStorage.getItem("clientId");
  console.log(clientid);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/clients/find/${clientId ?? ""}`
    );
    const result: Client = response.data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export async function requestSms(
  phoneNumber: number
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
    },
  };
  const uri: string = "/api/sendotp?" + `PhoneNumber=${phoneNumber}`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: any = data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
export async function signIn(
  phoneNumber: number,
  code: number
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
    },
  };
  const uri: string =
    "/api/signin?" + `PhoneNumber=${phoneNumber}&code=${code}`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: any = data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}

export async function checkSignIn(
  id: string,
  accessToken: string
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      token: accessToken,
    },
  };
  const uri: string = "http://localhost:5000/api/client/islogin/" + `${id}`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: any = data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
