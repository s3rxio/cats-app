import { BaseComponent } from "@/shared/types";
import { CatsList, fetchCats } from "@/entities/cat";
import { homeStyles } from "./styles";
import clsx from "clsx";
import { Cat } from "@/entities/cat";
import { useEffect, useState } from "react";

const HomePage: BaseComponent = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAndSetCats = async () => {
    try {
      setIsLoading(true);

      await fetchCats({
        size: "med",
      }).then((cats) => {
        setCats((prev) => [...prev, ...cats]);
      });

      setIsLoading(false);

      return cats;
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    fetchAndSetCats();
  }, [isLoading]);

  const resStyles = (state: boolean) =>
    clsx(homeStyles.res, state && homeStyles.resHidden);

  return (
    <div className={clsx("container", homeStyles.root)}>
      {!isError && (
        <CatsList
          cats={cats.map(({ url: imageUrl }) => ({
            imageUrl,
            isFavorite: false,
          }))}
          noElementsElement={
            <p className={resStyles(isLoading)}>{"Нет котиков :("}</p>
          }
        />
      )}
      <p className={resStyles(!isLoading || isError)}>
        ... загружаем еще котиков ...
      </p>

      <p className={resStyles(!isError)}>Произошла ошибка :(</p>
    </div>
  );
};

export default HomePage;
