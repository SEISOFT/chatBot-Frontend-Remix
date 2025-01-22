// app/routes/index.tsx
import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function Index() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login")
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Bienvenido a la Aplicación con Chakra UI
      </Heading>
      <Button colorScheme="teal" size="lg" onClick={handleNavigate}>
        Comienza aquí
      </Button>
    </Box>
  );
}
