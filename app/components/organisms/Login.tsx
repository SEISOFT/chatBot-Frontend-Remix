import { useNavigate } from "react-router";
import {
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SharkyImage } from "../atoms/SharkyImage";
import { LoginForm } from "../molecules/LoginForm";
import { colors } from "../../styles/colors";

export const Login = () => {
  const navigate = useNavigate();
  const showSharkyImage = useBreakpointValue({ base: false, lg: true });

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
      align={{ base: "top", lg: "center" }}
      bgColor={"gray.50"}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        w="full"
        maxW="6xl"
        boxShadow="lg"
        rounded={{ base: "none", lg: "lg" }}
        bg="white"
        overflow="hidden"
      >
        {/* Sección del Formulario de Login */}
        <Flex
          height={{ base: "100vh", lg: "auto" }}
          w={{ base: "100%", lg: "50%" }}
          direction="column"
          p={8}
          justifyContent={"space-between"}
        >
          <Heading
            as="h1"
            fontSize={{ base: "6xl", lg: "8xl" }}
            fontWeight="bold"
            textAlign="center"
            color={colors.Blue[800]}
            variant={"sharky"}
            letterSpacing={1}
          >
            Sharky
          </Heading>
          <Flex justifyContent={"center"} pb={24}>
            <LoginForm onSuccess={handleLoginSuccess} />
          </Flex>
          <Text textAlign={"center"}>
            Todos los derechos reservados.
            <Link
              variant={"primary"}
              href="https://softwow.com.co"
              target="_blank"
            >
              © 2024 Softwow
            </Link>
          </Text>
        </Flex>
        {/* Sección de la Imagen de Sharky */}
        {showSharkyImage && (
          <Flex
            w={"50%"}
            bg={colors.Blue[800]}
            p={8}
            justify="center"
            align="center"
          >
            <SharkyImage />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
