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

  const res = await catsApi
    .get<Cat[]>(
      `/images/search?limit=${limit}&page=${page}&size=${size}&mime_types=${mimeTypes}`
    )
    .catch((err) => {
      console.log(err);
      return {
        data: [],
      };
    });

  return res.data;
};

export const fetchCatImageUrl = async (
  id: string
): Promise<string | undefined> => {
  const res = await catsApi
    .get<{ url: string }>(`/images/${id}/?size=full`)
    .catch((err) => {
      console.log(err);
    });

  return res?.data?.url;
};
