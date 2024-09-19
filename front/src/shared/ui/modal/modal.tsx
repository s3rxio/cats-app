import { BaseComponent } from "@/shared/ui/types";
import { modalStyles } from "./styles";
import { clsx } from "clsx";
import { Portal } from "../portal";
import { Button } from "../button";

export interface ModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}
export const Modal: BaseComponent<ModalProps> = ({
  isModalOpen,
  handleModalClose,
  children,
  className,
  ...props
}) => {
  return (
    <Portal wrapperId="modal-root">
      <div
        className={clsx(
          modalStyles.overlay,
          isModalOpen && modalStyles.overlayVisible
        )}
      >
        <div className={clsx(modalStyles.root, className)} {...props}>
          <header className={modalStyles.header}>
            <Button onClick={handleModalClose}>x</Button>
          </header>
          {children}
        </div>
      </div>
    </Portal>
  );
};
