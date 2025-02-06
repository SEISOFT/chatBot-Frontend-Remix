import {
  Flex,
  Text,
  OrderedList,
  ListItem,
  Spinner,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigation } from "~/hooks/useNavigation";
import { colors } from "~/styles/colors";

interface WhatsAppConnectionCardProps {
  qrCode: string | null;
  isLoading: boolean;
  countdown: number;
  onRefresh: () => void;
}

export const WhatsAppConnectionCard = ({
  qrCode,
  isLoading,
  countdown,
  onRefresh,
}: WhatsAppConnectionCardProps) => {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const { isSidebarCollapsed } = useNavigation();
  return (
    <Flex
      bg={"white"}
      p={6}
      gap={4}
      minW={{
        base: "100%",
        xl: isSidebarCollapsed ? "466px" : "100%",
        "2xl": "466px",
      }}
      minH={{ base: "480px", md: "auto", lg: "280px", "2xl": "624px" }}
      maxH={{ "2xl": "fit-content" }}
      justifyContent="space-between"
      flexDir={{
        base: "column",
        md: "row",
        lg: "row",
        xl: isSidebarCollapsed ? "column" : "row",
        "2xl": "column",
      }}
      border={`1px solid ${colors.Gray[100]}`}
      borderRadius="2xl"
    >
      <Flex
        flexDir={{ base: "column" }}
        gap={3}
        w={"fit-content"}
        color={colors.Custom.textBlue}
      >
        <Text fontSize="lg" fontWeight={"black"} w={"fit-content"}>
          ¡Conecta tu WhatsApp con Sharky!
        </Text>
        <OrderedList fontSize="md" fontWeight={"medium"} w={"fit-content"}>
          <ListItem>Abre Whatsapp en tú télefono.</ListItem>
          <ListItem>Toca Menú en Android o Ajustes en Iphone.</ListItem>
          <ListItem>Vincula tu dispositivo escaneando el QR.</ListItem>
          <ListItem>
            Para hacerlo solo debes apuntar tu teléfono a la pantalla.
          </ListItem>
        </OrderedList>
        {/* Mostrar cuenta regresiva o mensaje de expirado */}
        <Text
          fontSize="sm"
          display={countdown > 0 ? "block" : "none"}
          w={"fit-content"}
        >
          (Este código caduca en <strong>{countdown}</strong> segundos)
        </Text>
      </Flex>
      {/* Columna Derecha: QR y botón refrescar */}
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={2}
      >
        {isLoading && (
          <Flex
            w={{ base: "216px", "2xl": "300px" }}
            h={{ base: "216px", "2xl": "300px" }}
            p={4}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="2xl"
            bg={"white"}
            gap={4}
            flexDir={"column"}
            border={`1px solid ${colors.Gray[100]}`}
          >
            <Spinner size="xl" />
          </Flex>
        )}

        {/* Mostrar QR si existe y no está caducado */}
        {!isLoading && qrCode && countdown > 0 && (
          <Flex
            alignItems={"center"}
            justifyContent="center"
            borderRadius="2xl"
            bg={"white"}
            p={4}
            border={`1px solid ${colors.Gray[100]}`}
          >
            <QRCodeCanvas
              value={qrCode}
              size={isMobile ? 184 : isSidebarCollapsed ? 300 : 184}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </Flex>
        )}
        {/* Si el QR existe pero ya caducó, mostramos solo el botón */}
        {qrCode && !isLoading && countdown <= 0 && (
          <Flex
            w={{ base: "216px", "2xl": "300px" }}
            h={{ base: "216px", "2xl": "300px" }}
            p={4}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="2xl"
            bg={"white"}
            gap={4}
            flexDir={"column"}
            border={`1px solid ${colors.Gray[100]}`}
          >
            <Text fontSize="sm" color="red.500" textAlign={"center"}>
              Este código ha caducado.
            </Text>
            {countdown <= 0 && (
              <Flex justifyContent="center">
                <Button variant={"solid"} onClick={onRefresh}>
                  Refrescar QR
                </Button>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
