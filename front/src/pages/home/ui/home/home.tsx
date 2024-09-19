import { homeStyles } from "./styles";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BaseComponent, Layout } from "@/shared/ui";
import { useCatsQuery } from "@/entities/cat";
import { Cat } from "@/shared/api";
import { CatsList } from "@/features/list-cats";

const HomePage: BaseComponent = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const { data, fetchNextPage, isFetching, error } = useCatsQuery();

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
    <Layout>
      <div className={clsx("container", homeStyles.root)}>
        <CatsList
          cats={cats.map((cat) => ({
            id: cat.id,
            imageUrl: cat.url,
          }))}
          onReachEnd={handleRefetch}
          isFetching={isFetching}
          error={error?.message}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
