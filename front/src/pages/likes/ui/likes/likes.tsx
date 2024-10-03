import { useEffect, useMemo, useState } from "react";
import { likesStyles } from "./styles";
import clsx from "clsx";
import { useQueries, useQuery } from "@tanstack/react-query";
import { appQueries, catQueries } from "@/shared/api";
import { CatsList } from "@/widgets/cats-list";

type CatQuery = ReturnType<typeof catQueries.getCatQuery>;

const LikesPage = () => {
  const { data: likesData } = useQuery({
    ...appQueries.likesQueries.getLikesQuery(),
    refetchOnMount: "always",
  });
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
        isLiked: true,
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
    if (!likesData || isFetching || isError || page >= maxPage) {
      return;
    }

    const start = page * limit;
    const newQueries: CatQuery[] = likesData.data
      .slice(start, start + limit)
      .map((like) => catQueries.getCatQuery(like.catId));

    setQueries([...queries, ...newQueries]);
  }, [likesData, page]);

  return (
    <div className={clsx("container", likesStyles.root)}>
      <CatsList
        cats={data}
        isFetching={isFetching}
        error={isError ? "Ошибка при загрузке котиков" : undefined}
        onReachEnd={() => setPage(page + 1)}
      />
    </div>
  );
};

export default LikesPage;
