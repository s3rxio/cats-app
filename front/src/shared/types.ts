import { FC, HTMLProps } from "react";

export interface BaseProps<T extends HTMLElement = HTMLDivElement>
  extends HTMLProps<T> {}

export interface BaseComponent<P = {}, T extends HTMLElement = HTMLDivElement>
  extends FC<BaseProps<T> & P> {}
