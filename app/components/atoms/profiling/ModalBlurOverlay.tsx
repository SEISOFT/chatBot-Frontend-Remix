import { AnimatePresence, motion } from "framer-motion";

export const ModalBlurOverlay = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ backdropFilter: "blur(10px)", opacity: 1 }}
        animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
        exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          zIndex: 1000,
        }}
      />
    </AnimatePresence>
  );
};
