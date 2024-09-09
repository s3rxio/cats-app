import { Modal, Button, Input } from "@/shared/ui";
import { useContext, useState } from "react";
import { authModalStyles } from "./styles";
import { UserContext } from "../../context";
import clsx from "clsx";
import { authUser } from "../../api";
import { AxiosError } from "axios";
import { BaseComponent } from "@/shared/types";

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
  const { setToken } = useContext(UserContext);

  const handleClose = () => setIsOpen(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    setError("");

    if (!login || !password) {
      setError("Заполните все поля");
      return;
    }

    authUser({ login, password })
      .then((res) => {
        setToken(res.headers["x-auth-token"]);
        setIsOpen(false);
      })
      .catch((err: AxiosError<any>) => {
        setError(err.response?.data?.message || "Error while authorization");
      });
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
          onChange={(ev) => setLogin(ev.currentTarget.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(ev) => setPassword(ev.currentTarget.value)}
        />
        <p
          className={clsx(
            authModalStyles.error,
            error && authModalStyles.errorVisible
          )}
        >
          {error}
        </p>
        <Button type="sumbit" className={authModalStyles.button}>
          Авторизоваться
        </Button>
      </form>
    </Modal>
  );
};
