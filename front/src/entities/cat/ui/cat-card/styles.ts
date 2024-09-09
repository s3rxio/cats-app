import catCardStylesModule from "./cat-card.module.scss";

const catCardStyles = {
  root: catCardStylesModule["cat-card"],
  isLiked: catCardStylesModule["cat-card--liked"],
  image: catCardStylesModule["cat-card__image"],
  like: catCardStylesModule["cat-card__like"],
  checkbox: catCardStylesModule["cat-card__checkbox"],
  checkboxIcon: catCardStylesModule["cat-card__checkbox__icon"],
  checkboxIconActive: catCardStylesModule["cat-card__checkbox__icon--active"],
  checkboxInput: catCardStylesModule["cat-card__checkbox__input"],
};

export { catCardStylesModule, catCardStyles };
