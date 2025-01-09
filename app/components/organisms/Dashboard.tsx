import { Box, Flex, Heading, Spinner, Button, Text } from "@chakra-ui/react";
import { Sidebar } from "../molecules/navigation/SideBar";
import { Navbar } from "../molecules/navigation/Navbar";
import { useAuth } from "~/hooks/useAuth";
import { useQRCode } from "~/hooks/useQRCode";
import { QRCodeCanvas } from "qrcode.react";

export const Dashboard = () => {
  const { user } = useAuth();
  const { qrCode, error, isLoading, refetch } = useQRCode();


  return (
    <Box>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex={"1"} overflowX={"auto"} py={10} px={6}>
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
                  size={200} // Tamaño del QR Code en px
                  fgColor="#000000" // Color del QR
                  bgColor="#ffffff" // Fondo del QR
                />
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
