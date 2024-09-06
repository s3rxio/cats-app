import { appApiConfig, catsApiConfig } from "@/shared/configs";
import axios from "axios";

export const catsApi = axios.create({
  baseURL: catsApiConfig.url,
  headers: {
    "x-api-key": catsApiConfig.apiKey,
  },
});

export const appApi = axios.create({
  baseURL: appApiConfig.url,
  headers: {
    authorization: localStorage.getItem("token"),
  },
});
