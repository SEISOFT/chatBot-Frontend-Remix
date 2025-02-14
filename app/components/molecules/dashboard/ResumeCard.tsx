import { Flex, Text } from "@chakra-ui/react";
import { TbPlugConnected } from "react-icons/tb";
import { useUser } from "~/hooks/useUser";
import { colors } from "~/styles/colors";

export const ResumeCard = () => {
  const { user } = useUser();
  return (
    <Flex
      bgImage={"app/assets/images/bannerSharky1.jpg"}
      bgSize={"cover"}
      bgPosition={"center"}
      flexDir={"column"}
      gap={4}
      p={4}
      borderRadius={"xl"}
      color={colors.Custom.textBlue}
      w={"100%"}
      minW={{
        base: "100%",
      }}
      minH={"222px"}
    >
      <Flex flexDir={"column"} alignItems={"start"} gap={4}>
        <Text fontSize="lg" fontWeight={"black"} w={"fit-content"}>
          ¡Bienvenido, a SHARKY!
        </Text>
        <Text fontSize={"18px"} fontWeight={"bold"} textAlign={"center"}>
          {user?.username}
        </Text>
      </Flex>

      <Text
        fontSize="md"
        color={colors.Custom.textBlue}
        textAlign={"start"}
        display={"flex"}
        gap={2}
      >
        WhatsApp:
        <Text
          as={"span"}
          display={"flex"}
          alignItems={"center"}
          gap={2}
          fontSize="md"
          color={colors.Green[400]}
        >
          Conectado
          <TbPlugConnected />
        </Text>
      </Text>
    </Flex>
  );
};
