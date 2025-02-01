import {
  Flex,
  Text,
  OrderedList,
  ListItem,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
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
  return (
    <Flex
      bg={"white"}
      p={6}
      gap={4}
      borderRadius="2xl"
      boxShadow="md"
      w={"100%"}
      minH={"276px"}
      justifyContent="space-between"
      flexDir={{ base: "column", md: "row" }}
      border={`2px solid ${colors.Gray[100]}`}
      borderBottom={"none"}
    >
      <Flex
        flexDir={{ base: "column", md: "column" }}
        gap={3}
        w={"fit-content"}
        color={colors.Custom.textBlue}
        pt={3}
      >
        <Text fontSize="lg" fontWeight={"black"} w={"fit-content"}>
          Conecta tu WhatsApp con Sharky y deja que Sharky responda 24/7
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
            w={"216px"}
            h={"216px"}
            p={4}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="2xl"
            bg={"white"}
            gap={4}
            flexDir={"column"}
            boxShadow="md"
            border={`2px solid ${colors.Gray[100]}`}
            borderBottom={"none"}
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
            boxShadow="md"
            bg={"white"}
            p={4}
            border={`2px solid ${colors.Gray[100]}`}
            borderBottom={"none"}
          >
            <QRCodeCanvas
              value={qrCode}
              size={184}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </Flex>
        )}
        {/* Si el QR existe pero ya caducó, mostramos solo el botón */}
        {qrCode && !isLoading && countdown <= 0 && (
          <Flex
            w={"216px"}
            h={"216px"}
            p={4}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="2xl"
            bg={"white"}
            gap={4}
            flexDir={"column"}
            boxShadow="md"
            border={`2px solid ${colors.Gray[100]}`}
            borderBottom={"none"}
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
