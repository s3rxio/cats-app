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
});

appApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});
