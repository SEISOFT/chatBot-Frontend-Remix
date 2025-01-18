// app/components/organisms/Dashboard.tsx
import { Box, Heading, Spinner, Button, Text, Flex } from "@chakra-ui/react";
import { useQRCode } from "~/hooks/useQRCode";
import { QRCodeCanvas } from "qrcode.react";
import { useUser } from "~/hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";
import { ProfilingModal } from "~/components/molecules/profiling/ProfilingModal";
import { SharkyProfile } from "../atoms/SharkyProfile";
import { useModalControl } from "~/hooks/useModalControl";
import { useWelcomeAnimation } from "~/hooks/profiling/useWelcomeAnimation";

export const Dashboard = () => {
  const { user } = useUser();
  const { qrCode, error, isLoading, refetch } = useQRCode();
  const { isModalOpen, closeModal } = useModalControl();
  const { showWelcomeAnimation, triggerAnimation } = useWelcomeAnimation();

  const handleCompleteProfiling = () => {
    closeModal();
    triggerAnimation();
  };

  return (
    <Box flex={"1"} overflowX={"auto"} py={10} px={6} position="relative">
      <Heading as="h1" size="xl" mb={4}>
        Welcome, {user?.email}!
      </Heading>

      {/* Mostrar QR Code */}
      <Box mt={8} textAlign="center">
        <Heading as="h2" size="md" mb={4}>
          Escanea este código QR
        </Heading>
        {isLoading && <Spinner size="xl" />}
        {error && (
          <Box>
            <Text color="red.500" mb={4}>
              No se pudo cargar el código QR. Intenta nuevamente.
            </Text>
            <Button colorScheme="blue" onClick={refetch}>
              Reintentar
            </Button>
          </Box>
        )}
        {qrCode && (
          <Box
            display="inline-block"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            <QRCodeCanvas
              value={qrCode}
              size={200}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </Box>
        )}
      </Box>
      {/* Fondo desenfocado siempre activo */}
      <AnimatePresence>
        {(isModalOpen || showWelcomeAnimation) && (
          <motion.div
            initial={{ backdropFilter: "blur(10px)", opacity: 1 }}
            animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }} // Animación de salida suave
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
        )}
      </AnimatePresence>
      {/* Modal de Perfilamiento */}
      {isModalOpen && (
        <ProfilingModal
          isOpen={isModalOpen}
          onClose={handleCompleteProfiling}
        />
      )}

      {/* Animación del Mensaje de Bienvenida */}
      <AnimatePresence>
        {showWelcomeAnimation && (
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
        )}
      </AnimatePresence>
    </Box>
  );
};
