import catCardStylesModule from "./cat-card.module.scss";

const catCardStyles = {
  root: catCardStylesModule["cat-card"],
  isFavorite: catCardStylesModule["cat-card--favorite"],
  image: catCardStylesModule["cat-card__image"],
  favorite: catCardStylesModule["cat-card__favorite"],
  checkbox: catCardStylesModule["cat-card__checkbox"],
  checkboxIcon: catCardStylesModule["cat-card__checkbox__icon"],
  checkboxIconFavorite:
    catCardStylesModule["cat-card__checkbox__icon--favorite"],
  checkboxInput: catCardStylesModule["cat-card__checkbox__input"],
};

export { catCardStylesModule, catCardStyles };
