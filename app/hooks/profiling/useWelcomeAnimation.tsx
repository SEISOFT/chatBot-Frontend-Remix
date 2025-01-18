import { useState } from "react";

export const useWelcomeAnimation = () => {
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

  const triggerAnimation = () => {
    setShowWelcomeAnimation(true);
    setTimeout(() => setShowWelcomeAnimation(false), 4000); // Dura 4 segundos
  };

  return { showWelcomeAnimation, triggerAnimation };
};
