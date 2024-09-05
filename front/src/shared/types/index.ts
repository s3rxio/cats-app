import { FC, HTMLAttributes } from "react";

export interface BaseProps<T extends HTMLElement = HTMLDivElement>
  extends HTMLAttributes<T> {}

export interface BaseComponent<P = {}> extends FC<BaseProps & P> {}
