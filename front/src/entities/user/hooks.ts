import { useState } from "react";

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return { isOpen, setIsOpen, handleClose };
};
