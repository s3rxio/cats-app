import { Modal, Button, Input } from "@/shared/ui";
import { useCallback, useState } from "react";
import { authModalStyles } from "./styles";
import clsx from "clsx";
import { BaseComponent } from "@/shared/types";
import { useAuth } from "../../hooks";
import { useAuthMutation } from "../../queries";

export interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
}

export const AuthModal: BaseComponent<AuthModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const { mutateAsync, reset } = useAuthMutation();

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    setError("");
    reset();

    if (!login || !password) {
      setError("Заполните все поля");
      return;
    }

    await mutateAsync(
      { login, password },
      {
        onSuccess: (data) => {
          auth(data.headers["x-auth-token"]);

          setIsOpen(false);
        },
        onError: (error) => {
          if (Array.isArray(error.response?.data.message)) {
            setError(error.response?.data.message[0] || "");
            return;
          }

          setError(error.response?.data.message || "");
        },
      }
    );
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleModalClose={handleClose}
      className={authModalStyles.root}
    >
      <form className={authModalStyles.form} onSubmit={handleSubmit}>
        <h2 className={authModalStyles.title}>Регистрация</h2>
        <Input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(ev) => setLogin(ev.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <p
          className={clsx(
            authModalStyles.error,
            error && authModalStyles.errorVisible
          )}
        >
          {error || "Что-то пошло не так"}
        </p>
        <Button type="submit" className={authModalStyles.button}>
          Авторизоваться
        </Button>
      </form>
    </Modal>
  );
};
