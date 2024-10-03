import axios from "axios";
import { catsApiConfig } from "./config";

export const catsApiInstance = axios.create({
  baseURL: catsApiConfig.url,
  headers: {
    "x-api-key": catsApiConfig.apiKey,
  },
});
