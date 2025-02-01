import { Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { SharkyProfile } from "~/components/atoms/SharkyProfile";

export const WelcomeAnimation = () => {
  return (
    <AnimatePresence>
      <Flex
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: "2", ease: "easeInOut" }}
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        zIndex={1100}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: "0px 0px 10px rgba(37, 99, 235, 0.8)",
            fontFamily: "Retroguard",
            lineHeight: 1.2,
          }}
        >
          <SharkyProfile w="clamp(80px, 10vw, 120px)" mx="auto" mb={4} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              display: "block",
              fontSize: "clamp(32px, 6vw, 64px)",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Bienvenido a
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              display: "block",
              fontSize: "clamp(48px, 10vw, 96px)",
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            Sharky
          </motion.span>
        </motion.div>
      </Flex>
    </AnimatePresence>
  );
};
