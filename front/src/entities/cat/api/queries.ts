import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Cat,
  catApi,
  GetCatParams,
  GetCatsParams,
  AppApiAxiosError,
} from "@/shared/api";
import { AxiosResponse } from "axios";

export const CAT_QUERY_KEY = "cat";

export const useCatsQuery = (params: GetCatsParams = {}) => {
  return useInfiniteQuery({
    queryKey: [CAT_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      catApi.fetchCats({ ...params, page: pageParam }).then((res) => res.data),
    initialPageParam: params.page || 0,
    getNextPageParam: (_last, _pages, h) => ++h,
  });
};

export const useCatQuery = (id: string, params: GetCatParams) => {
  return useQuery<AxiosResponse<Cat>, AppApiAxiosError>({
    queryKey: [CAT_QUERY_KEY, id],
    queryFn: () => catApi.fetchCatById(id, params),
  });
};
