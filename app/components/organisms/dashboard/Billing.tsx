import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { colors } from "~/styles/colors";

export const Billing = () => {
  return (
    <Flex
      flexDir={"column"}
      transition="width 0.4s"
      py={6}
      gap={3}
      w={"100%"}
      pl={{ base: 4, lg: 0 }}
      mx={"auto"}
      pr={{ base: 4, lg: 3, "2xl": 3 }}
    >
      <Box bg="white" p={4} borderRadius="xl">
        <Heading as="h1" size="xl" mb={4}>
          Historial de Facturación
        </Heading>

        <Box overflowX="auto">
          <Table
            variant="unstyled"
            pt="4"
            borderRadius="8px"
            boxShadow="md"
            minW="600px"
          >
            <Thead bg={colors.Blue[100]}>
              <Tr>
                <Th
                  fontWeight="bold"
                  fontSize="14px"
                  textTransform="none"
                  borderTopLeftRadius="8px"
                >
                  Fecha de la Orden
                </Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none">
                  Tipo de Subscripción
                </Th>
                <Th
                  fontWeight="bold"
                  fontSize="14px"
                  textTransform="none"
                  textAlign="center"
                  borderTopRightRadius="8px"
                >
                  Estado de la Orden
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize="14px">12/12/2024</Td>
                <Td fontSize="14px">Subscripción Premium - mensual</Td>
                <Td textAlign="center">
                  <Box
                    bg="#A3FBD1"
                    borderRadius="full"
                    py={1}
                    px={4}
                    w="max-content"
                    fontSize="14px"
                    mx="auto"
                  >
                    Pagada
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};
