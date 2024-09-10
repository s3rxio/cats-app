import { BaseComponent } from "@/shared/types";
import { CatCardProps, CatsList, fetchCats } from "@/entities/cat";
import { homeStyles } from "./styles";
import clsx from "clsx";
import { Cat } from "@/entities/cat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Layout } from "@/shared/ui";

const HomePage: BaseComponent = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAndAddCats = async () => {
    try {
      setIsLoading(true);

      await fetchCats({
        size: "med",
        page,
      }).then((cats) => {
        setCats((prev) => [...prev, ...cats]);
        setPage((prev) => prev + 1);
      });

      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 48
    ) {
      setIsLoading(true);
    }
  };

  useMemo(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    fetchAndAddCats();
  }, [isLoading]);

  const resStyles = useCallback(
    (state: boolean) => clsx(homeStyles.res, state && homeStyles.resHidden),
    [isLoading, isError]
  );

  return (
    <Layout>
      <div className={clsx("container", homeStyles.root)}>
        {
          <CatsList
            cats={cats.map(
              ({ id, url: imageUrl }): CatCardProps => ({
                id,
                imageUrl,
              })
            )}
            noElementsElement={
              <p className={resStyles(isLoading || isError)}>
                {"Нет котиков :("}
              </p>
            }
          />
        }

        <p className={resStyles(!isLoading || isError)}>
          ... загружаем еще котиков ...
        </p>
        <p className={resStyles(!isError)}>Произошла ошибка :(</p>
      </div>
    </Layout>
  );
};

export default HomePage;
