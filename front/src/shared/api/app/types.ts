import { AxiosError } from "axios";

export interface Like {
  id: number;
  catId: string;
  createdAt: Date;
}

export interface User {
  id: number;
  login: string;
  password: string;
  likes: Like[];
}

export type AuthUserDto = Pick<User, "login" | "password">;

export interface AppApiException {
  error: string;
  message?: string | string[];
  statusCode: number;
}

export type AppApiAxiosError = AxiosError<AppApiException>;
