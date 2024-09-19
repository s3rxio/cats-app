import { CatsList } from "@/features/list-cats";
import { Layout } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
import { likesStyles } from "./styles";
import clsx from "clsx";
import { useAuthModal, useToken, useLikesQuery } from "@/entities/user";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { Cat, catApi } from "@/shared/api";
import { CAT_QUERY_KEY } from "@/entities/cat";
import { AxiosResponse } from "axios";

type CatQuery = UseQueryOptions<AxiosResponse<Cat>>;

const LikesPage = () => {
  const { data: likesData, error: likesError } = useLikesQuery({
    refetchOnMount: "always",
  });
  const { token } = useToken();
  const { openAuthModal } = useAuthModal();
  const [page, setPage] = useState(0);
  const [limit] = useState(15);
  const [queries, setQueries] = useState<CatQuery[]>([]);
  const { data, isFetching, isError } = useQueries({
    queries,
    combine(result) {
      const isFetching = result.some((r) => r.isFetching);
      const isError = result.some((r) => r.isError);
      const data = result.map((r) => r.data?.data).filter((cat) => !!cat);

      const cats = data.map((cat) => ({
        id: cat.id,
        imageUrl: cat.url,
      }));

      return {
        isFetching,
        isError,
        data: cats,
      };
    },
  });

  const maxPage = useMemo(
    () => Math.ceil(likesData?.data.length || 0 / limit),
    [likesData, limit]
  );

  useEffect(() => {
    if (!token || likesError) {
      openAuthModal();
      return;
    }

    if (!likesData || isFetching || isError || page >= maxPage) {
      return;
    }

    const start = page * limit;
    const newQueries = likesData.data
      .slice(start, start + limit)
      .map<CatQuery>((like) => ({
        queryKey: [CAT_QUERY_KEY, like],
        queryFn: () => catApi.fetchCatById(like.catId),
      }));

    setQueries([...queries, ...newQueries]);
  }, [likesData, page, token]);

  return (
    <Layout>
      <div className={clsx("container", likesStyles.root)}>
        <CatsList
          cats={data}
          isFetching={isFetching}
          error={isError ? "Ошибка при загрузке котиков" : undefined}
          onReachEnd={() => setPage(page + 1)}
        />
      </div>
    </Layout>
  );
};

export default LikesPage;
