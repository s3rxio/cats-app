import { BaseComponent } from "@/shared/types";
import clsx from "clsx";
import { headerStyles } from "./styles";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

export const Header: BaseComponent = ({ className, ...props }) => {
  const linkClassName = ({ isActive }: NavLinkRenderProps) =>
    clsx(headerStyles.link, isActive && headerStyles.linkActive);

  return (
    <header className={clsx(headerStyles.root, className)} {...props}>
      <div className={clsx("container", headerStyles.container)}>
        <NavLink to="/" className={linkClassName}>
          Все котики
        </NavLink>
        <NavLink to="/favorites" className={linkClassName}>
          Любимые котики
        </NavLink>
      </div>
    </header>
  );
};
