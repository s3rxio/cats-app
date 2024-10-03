import { BaseComponent } from "@/shared/ui/types";
import { layoutStyles } from "./styles";
import { clsx } from "clsx";
import { Header } from "../header";

export const Layout: BaseComponent = ({ children, className, ...props }) => {
  return (
    <div className={clsx(layoutStyles.root, className)} {...props}>
      <Header />
      <main className={layoutStyles.main}>{children}</main>
    </div>
  );
};
