import { useState } from "react";

export const useModalControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, closeModal };
};
