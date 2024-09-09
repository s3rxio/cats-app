import { catsApiConfig } from "@/shared/configs";
import { appApi, catsApi } from "@/shared/libs/http";
import { Cat } from "./model";

export interface GetCatsParam {
  limit?: number;
  page?: number;
  size?: "thumb" | "small" | "med" | "full";
  mimeTypes?: "jpg" | "png" | "gif";
}

export interface GetCatsParams extends GetCatsParam {
  limit?: number;
  page?: number;
}

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

export const fetchCat = async (
  id: string,
  params?: GetCatsParam
): Promise<Cat | undefined> => {
  const { size = "small", mimeTypes = "jpg" } = params || {};

  const res = await catsApi.get<Cat>(
    `/images/${id}?size=${size}&mime_types=${mimeTypes}`
  );

  return res.data;
};

export const fetchLikes = async () => {
  const res = await appApi.get<{ catId: string }[]>("/likes");

  return res.data;
};

export const likeCat = async (catId: string) => {
  const res = await appApi.post(`/likes`, {
    catId,
  });

  return res.data;
};

export const dislikeCat = async (catId: string) => {
  return await appApi.delete(`/likes/${catId}`);
};
