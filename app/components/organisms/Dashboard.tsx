import { Box, Heading, Spinner, Button, Text, Flex } from "@chakra-ui/react";
import { useQRCode } from "~/hooks/useQRCode";
import { QRCodeCanvas } from "qrcode.react";
import { useUser } from "~/hooks/useUser";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfilingModal } from "~/pages/profiling/ProfilingModal";
import { colors } from "~/styles/colors";
import { SharkyProfile } from "../atoms/SharkyProfile";

export const Dashboard = () => {
  const { user } = useUser();
  const { qrCode, error, isLoading, refetch } = useQRCode();

  // Controlar el modal y el mensaje de bienvenida
  const [isProfilingModalOpen, setIsProfilingModalOpen] = useState(true);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);

  const handleCompleteProfiling = () => {
    setIsProfilingModalOpen(false); // Ocultar el modal
    setShowWelcomeAnimation(true); // Mostrar la animación del mensaje de bienvenida

    setTimeout(() => {
      setShowWelcomeAnimation(false); // Ocultar la animación después de 4 segundos
    }, 4000);
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
        {(isProfilingModalOpen || showWelcomeAnimation) && (
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
      {isProfilingModalOpen && (
        <ProfilingModal isOpen={true} onClose={handleCompleteProfiling} />
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
            zIndex={1100} // Colocar sobre el fondo constante
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 1.5, // Ajuste de duración para mayor fluidez
                ease: "easeInOut", // Curva de animación más suave
              }}
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                textShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
                fontFamily: "Retroguard",
                lineHeight: 1.2, // Ajuste del espacio entre líneas
              }}
            >
              <SharkyProfile
                w="clamp(80px, 10vw, 120px)" // Tamaño responsivo de la imagen
                mx="auto" // Centrar la imagen
                mb={4} // Espaciado inferior entre la imagen y el texto
              />

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                style={{
                  display: "block", // Cada línea en su propio bloque
                  fontSize: "clamp(32px, 6vw, 64px)", // Tamaño responsivo más grande
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
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.5, // Retraso para "Sharky"
                }}
                style={{
                  display: "block",
                  fontSize: "clamp(48px, 10vw, 96px)", // Tamaño responsivo mayor
                  fontWeight: "bold",
                  color: colors.Blue[500],
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
