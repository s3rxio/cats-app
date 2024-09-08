import { catsApiConfig } from "@/shared/configs";
import { catsApi } from "@/shared/libs/http";
import { Cat } from "./model";

export type GetCatsParams = {
  limit?: number;
  page?: number;
  size?: "thumb" | "small" | "med" | "full";
  mimeTypes?: "jpg" | "png" | "gif";
};

export const fetchCats = async (params?: GetCatsParams): Promise<Cat[]> => {
  const {
    limit = catsApiConfig.catsCount,
    page = 0,
    size = "small",
    mimeTypes = "jpg",
  } = params || {};

  const res = await catsApi.get<Cat[]>(
    `/images/search?limit=${limit}&page=${page}&size=${size}&mime_types=${mimeTypes}`
  );

  return res.data;
};

export const fetchCat = async (id: string): Promise<Cat | undefined> => {
  const res = await catsApi.get<Cat>(`/images/${id}/?size=full`);

  return res.data;
};
