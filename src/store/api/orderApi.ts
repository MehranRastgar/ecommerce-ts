import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AddToCartType, Cart, Client, Order } from "../../../src/types/types";
import { variantId } from "../slices/orderSlice";

export type updatedPrice = {
  variantId: string;
  rrp_price: number;
  selling_price: number;
};

export async function getCartPrices(
  variantIds: variantId[],
  token: string,
  userId: string
): Promise<UpdatePriceRespons[] | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  try {
    const axiosConf: AxiosRequestConfig = {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "*/*",
        token: token,
      },
    };
    const body: any = {
      variantIds: variantIds,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/updateprices/` +
        `${userId}`,
      body,
      axiosConf
    );
    const result: UpdatePriceRespons[] = response.data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export interface UpdatePriceRespons {
  price?: Price;
  _id?: string;
}

export interface Price {
  selling_price?: number;
  rrp_price?: number;
}
