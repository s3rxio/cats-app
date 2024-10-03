import { homeStyles } from "./styles";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BaseComponent } from "@/shared/ui";
import { appQueries, Cat, catQueries } from "@/shared/api";
import { CatsList } from "@/widgets/cats-list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const HomePage: BaseComponent = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const { data, fetchNextPage, isFetching, error } = useInfiniteQuery(
    catQueries.getCatsQuery()
  );
  const likes = useQuery(appQueries.likesQueries.getLikesQuery());

  useEffect(() => {
    const newCats = data?.pages[data.pages.length - 1] || [];

    setCats([...cats, ...newCats]);
  }, [data]);

  const handleRefetch = async function () {
    if (isFetching) return;

    await fetchNextPage({
      cancelRefetch: false,
    });
  };

  return (
    <div className={clsx("container", homeStyles.root)}>
      <CatsList
        cats={cats.map((cat) => ({
          id: cat.id,
          imageUrl: cat.url,
          isLiked: !!likes.data?.data.find((like) => like.catId === cat.id),
        }))}
        onReachEnd={handleRefetch}
        isFetching={isFetching}
        error={error?.message}
      />
    </div>
  );
};

export default HomePage;
