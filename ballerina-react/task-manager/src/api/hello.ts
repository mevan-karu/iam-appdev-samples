import { AxiosResponse } from "axios";
import { initInstance } from "./instance";
import { Message } from "./type/message";

export async function getHelloFromService(baseURL: string, accessToken: string) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await initInstance(baseURL).get("/api/hello", {
      headers: headers,
    });
    return response as AxiosResponse<Message>;
}