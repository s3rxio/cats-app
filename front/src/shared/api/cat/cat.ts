import { catsApiConfig } from "./config";
import { catsApiInstance } from "./instance";
import { Cat, GetCatParams, GetCatsParams } from "./types";

const fetchCats = (params?: GetCatsParams) => {
  const {
    limit = catsApiConfig.catsCount,
    page = 0,
    size = "med",
    mimeTypes = "jpg",
  } = params || {};

  return catsApiInstance.get<Cat[]>(
    `/images/search?limit=${limit}&page=${page}&size=${size}&mime_types=${mimeTypes}`
  );
};

const fetchCatById = (id: string, params?: GetCatParams) => {
  const { size = "med", mimeTypes = "jpg" } = params || {};

  return catsApiInstance
    .get<Cat>(`/images/${id}?size=${size}&mime_types=${mimeTypes}`)
    .catch(Promise.reject);
};

export const catApi = {
  fetchCats,
  fetchCatById,
};
