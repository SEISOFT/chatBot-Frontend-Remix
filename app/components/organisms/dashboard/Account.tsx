import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { colors } from "~/styles/colors";

export const Account = () => {
  return (
    <Box flex={"1"} overflowX={"auto"} py={10} px={6} position="relative">
      <Heading as="h1" size="xl" mb={4}>
        Mis suscripciones
      </Heading>
      <Table variant="unstyled" pt="4" borderRadius="8px" boxShadow="md">
        <Thead bg={colors.Blue[100]}> 
          <Tr>
            <Th fontWeight="bold" fontSize="14px" textTransform="none" borderTopLeftRadius={"8px"}>
              Fecha de la Orden
            </Th>
            <Th fontWeight="bold" fontSize="14px" textTransform="none">
              Tipo de Subscripción
            </Th>
            <Th
              fontWeight="bold"
              fontSize="14px"
              textTransform="none"
              textAlign={"center"}
              borderTopRightRadius={"8px"}
            >
              Estado de la Orden
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize="14px">12/12/2024</Td>
            <Td fontSize="14px">Subscripción Premium - mensual</Td>
            <Td>
              <Box
                bg={"#A3FBD1"}
                borderRadius="full"
                py={1}
                px={4}
                w={"max-content"}
                fontSize={"14px"}
                mx={"auto"}
              >
                Pagada
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
