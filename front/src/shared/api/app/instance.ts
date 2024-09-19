import axios from "axios";
import { appApiConfig } from "@/shared/configs";
import { USER_TOKEN_KEY } from "@/shared/consts";

export const appApiInstance = axios.create({
  baseURL: appApiConfig.url,
});

appApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
