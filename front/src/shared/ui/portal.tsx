import { createPortal } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
  wrapperId: string;
}

export const Portal = ({ children, wrapperId }: PortalProps) =>
  createPortal(children, document.getElementById(wrapperId)!);
