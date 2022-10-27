import axios, { AxiosError } from "axios";
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
