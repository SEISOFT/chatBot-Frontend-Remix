import {
  Flex,
  Text,
  OrderedList,
  ListItem,
  Spinner,
  Button
} from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigation } from "~/hooks/useNavigation";
import { colors } from "~/styles/colors";
import SharkyProfile from "~/assets/images/sharky-profile.png";

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
  const { isSidebarCollapsed } = useNavigation();
  return (
    <Flex
      bg={"white"}
      p={4}
      gap={4}
      minW={{
        base: "100%",
      }}
      minH={{ base: "480px", md: "252px", lg: "280px", "2xl": "252px" }}
      maxH={{ xl: "fit-content" }}
      justifyContent="space-between"
      flexDir={{
        base: "column",
        md: "row",
        lg: "row",
        xl: isSidebarCollapsed ? "column" : "row",
        "2xl": "row",
      }}
      border={`1px solid ${colors.Gray[100]}`}
      borderRadius="xl"
    >
      <Flex
        flexDir={{ base: "column" }}
        gap={3}
        w={"fit-content"}
      >
        <Text fontSize="lg" fontWeight={"black"} w={"fit-content"}   color={colors.Custom.textBlue}>
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
            w={{ base: "216px" }}
            h={{ base: "216px" }}
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
              size={184}
              fgColor="#000000"
              bgColor="#ffffff"
              imageSettings={{
                src: SharkyProfile,
                x: undefined,
                y: undefined,
                height: 50,
                width: 50,
                opacity: 1,
                excavate: false,
              }}
            />
          </Flex>
        )}
        {/* Si el QR existe pero ya caducó, mostramos solo el botón */}
        {qrCode && !isLoading && countdown <= 0 && (
          <Flex
            w={{ base: "216px" }}
            h={{ base: "216px" }}
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
