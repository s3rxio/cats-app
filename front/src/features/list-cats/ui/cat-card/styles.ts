import catCardStylesModule from "./cat-card.module.scss";

const catCardStyles = {
  root: catCardStylesModule["cat-card"],
  isLiked: catCardStylesModule["cat-card--liked"],
  imageBox: catCardStylesModule["cat-card__image-box"],
  imageBoxImage: catCardStylesModule["cat-card__image-box__image"],
  like: catCardStylesModule["cat-card__like"],
  likeIcon: catCardStylesModule["cat-card__like__icon"],
  likeIconIsActive: catCardStylesModule["cat-card__like__icon--active"],
  checkbox: catCardStylesModule["cat-card__checkbox"],
  checkboxInput: catCardStylesModule["cat-card__checkbox__input"],
};

export { catCardStylesModule, catCardStyles };
