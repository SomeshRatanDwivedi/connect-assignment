import type { AxiosInstance } from "axios";
import axios from "axios";
import { requestHandler, responseHandler } from "../../configs/api.config";
import { CLOSET_API_BASE_URL } from "../../constants/api.constants";

const closetApi: AxiosInstance = axios.create({
  baseURL:CLOSET_API_BASE_URL ,
});

// ** Attaches a Authorization header to all requests
closetApi.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return req;
  req.headers.Authorization = 'Bearer ' + token;
  return req;
}, requestHandler);

closetApi.interceptors.response.use((res) => res, responseHandler);

export { closetApi };