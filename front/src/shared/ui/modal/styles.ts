import modalStylesModule from "./modal.module.scss";

const modalStyles = {
  root: modalStylesModule.modal,
  header: modalStylesModule.modal__header,
  overlay: modalStylesModule["modal-overlay"],
  overlayVisible: modalStylesModule["modal-overlay--visible"],
};

export { modalStylesModule, modalStyles };
