import catsListStylesModule from "./cats-list.module.scss";

const catsListStyles = {
  root: catsListStylesModule["cats-list"],
  item: catsListStylesModule["cats-list__item"],
  full: catsListStylesModule["cats-list__full"],
  noCats: catsListStylesModule["cats-list__no-cats"],
  request: catsListStylesModule["cats-list__request"],
  requestVisible: catsListStylesModule["cats-list__request--visible"],
  requestFething: catsListStylesModule["cats-list__request__fetching"],
  requestError: catsListStylesModule["cats-list__request__error"],
};

export { catsListStylesModule, catsListStyles };
