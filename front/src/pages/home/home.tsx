import { BaseComponent } from "@/shared/types";
import { CatsList, fetchCat, fetchCats } from "@/entities/cat";
import { homeStyles } from "./styles";
import clsx from "clsx";
import { Cat } from "@/entities/cat";
import { useContext, useEffect, useState } from "react";
import {
  addLike,
  AuthModal,
  fetchLikes,
  removeLike,
  UserContext,
} from "@/entities/user";
import { useLocation } from "react-router-dom";

const HomePage: BaseComponent = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { token, favorites, setFavorites } = useContext(UserContext);
  const location = useLocation();

  const fetchAndAddCats = async () => {
    try {
      setIsLoading(true);

      if (location.pathname === "/favorites") {
        const fetchedFavorites = await fetchAndSetFavorites();

        fetchedFavorites.forEach(async (catId) => {
          await fetchCat(catId).then((cat) => {
            cat && setCats((prev) => [...prev, cat]);
          });
        });
      } else {
        await fetchCats({
          size: "med",
          page,
        }).then((cats) => {
          setCats((prev) => [...prev, ...cats]);
          setPage((prev) => prev + 1);
        });
      }

      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const fetchAndSetFavorites = async () => {
    const likes = await fetchLikes().then((res) =>
      res.map(({ catId }) => catId)
    );

    setFavorites(likes);

    return likes;
  };

  const handleFavorite = async (
    id: string,
    setIsFavorite: (prev: boolean) => void
  ) => {
    if (!token) {
      setOpenAuthModal(true);
      return;
    }

    const favorites = await fetchAndSetFavorites();
    const isExists = favorites.includes(id);

    try {
      if (isExists) {
        await removeLike(id);
        setFavorites(cats.map((cat) => cat.id).filter((catId) => catId !== id));
        setIsFavorite(false);

        return;
      }

      const res = await addLike(id);
      setFavorites((prev) => [...prev, res.catId]);
      setIsFavorite(true);
    } catch {
      setIsFavorite(false);
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
    setCats([]);
    setPage(0);
    if (location.pathname !== "/favorites" || token) {
      setIsLoading(true);
      setIsError(false);
    }

    if (location.pathname === "/favorites") {
      if (!token) {
        setOpenAuthModal(true);
        return;
      }

      window.removeEventListener("scroll", handleScroll);

      return;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, token]);

  useEffect(() => {
    if (!isLoading) return;

    fetchAndAddCats();
  }, [isLoading]);

  const resStyles = (state: boolean) =>
    clsx(homeStyles.res, state && homeStyles.resHidden);

  return (
    <div className={clsx("container", homeStyles.root)}>
      {openAuthModal && <AuthModal />}

      {!isError && (
        <CatsList
          cats={cats.map(({ id, url: imageUrl }) => ({
            id,
            imageUrl,
            onLike: handleFavorite,
            isFavorite: favorites?.find((catId) => catId === id) !== undefined,
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
