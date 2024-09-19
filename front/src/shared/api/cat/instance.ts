import { catsApiConfig } from "@/shared/configs";
import axios from "axios";

export const catsApiInstance = axios.create({
  baseURL: catsApiConfig.url,
  headers: {
    "x-api-key": catsApiConfig.apiKey,
  },
});
