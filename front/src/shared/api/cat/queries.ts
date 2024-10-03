import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { catApi, GetCatParams, GetCatsParams } from "@/shared/api";

const CAT_QUERY_KEY = "cat";

const getCatsQuery = (params: GetCatsParams = {}) =>
  infiniteQueryOptions({
    queryKey: [CAT_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      catApi.fetchCats({ ...params, page: pageParam }).then((res) => res.data),
    initialPageParam: params.page || 0,
    getNextPageParam: (_last, _pages, h) => ++h,
  });

const getCatQuery = (id: string, params: GetCatParams = {}) =>
  queryOptions({
    queryKey: [CAT_QUERY_KEY, id],
    queryFn: () => catApi.fetchCatById(id, params),
  });

export const catQueries = {
  getCatsQuery,
  getCatQuery,
};
