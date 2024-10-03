import authModalStylesModule from "./auth-modal.module.scss";

const authModalStyles = {
  root: authModalStylesModule["auth-modal"],
  form: authModalStylesModule["auth-modal__form"],
  title: authModalStylesModule["auth-modal__title"],
  error: authModalStylesModule["auth-modal__error"],
  errorVisible: authModalStylesModule["auth-modal__error--visible"],
  input: authModalStylesModule["auth-modal__input"],
  button: authModalStylesModule["auth-modal__button"],
};

export { authModalStylesModule, authModalStyles };
