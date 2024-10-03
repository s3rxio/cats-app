import axios from "axios";
import { TOKEN_KEY } from "@/shared/storage";
import { appApiConfig } from "./config";

export const appApiInstance = axios.create({
  baseURL: appApiConfig.url,
});

appApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
