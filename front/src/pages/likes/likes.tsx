import { Layout } from "@/shared/ui";
import clsx from "clsx";
import { likesStyles } from "./styles";
import { useState, useCallback, useEffect, useContext } from "react";
import { Cat, CatsList, fetchCat, useLikes } from "@/entities/cat";
import { useAuthModal, UserContext } from "@/entities/user";

const LikesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cats, setCats] = useState<Cat[]>([]);
  const { likes } = useLikes();
  const { token } = useContext(UserContext);
  const { openAuthModal } = useAuthModal();

  const fetchAndSetCats = async () => {
    try {
      setIsLoading(true);

      const cats = await Promise.all(
        likes.map((id) =>
          fetchCat(id, {
            size: "med",
          })
        )
      ).then((cats) => cats.filter((cat) => !!cat));

      setCats(cats);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      openAuthModal();
      return;
    }

    if (cats.length > 0) {
      return;
    }

    fetchAndSetCats();
  }, [likes]);

  const resStyles = useCallback(
    (state: boolean) => clsx(likesStyles.res, state && likesStyles.resHidden),
    [isLoading, isError]
  );
  return (
    <Layout>
      <div className={clsx("container", likesStyles.root)}>
        {!isError && (
          <CatsList
            cats={cats.map(({ id, url }) => ({
              id: id,
              imageUrl: url,
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
    </Layout>
  );
};

export default LikesPage;
