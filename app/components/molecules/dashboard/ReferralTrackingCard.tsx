import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

export const ReferralTrackingCard = () => {
  return (
    <Box
      bg="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      width={"full"}
      h={"full"}
      transition="width 0.4s, padding 0.4s"
    >
      {/* Encabezado */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Referral Tracking
        </Text>
        <IconButton
          aria-label="More options"
          icon={<FiMoreHorizontal />}
          variant="ghost"
          size="sm"
        />
      </Flex>

      {/* Sección de estadísticas */}
      <Flex
        gap={8}
        mb={4}
        flexWrap="wrap"
        justify={{ base: "space-between", md: "start" }}
      >
        <Box>
          <Text fontSize="sm" color="gray.500">
            Invited
          </Text>
          <Text fontSize="md" fontWeight="bold">
            145 people
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Bonus
          </Text>
          <Text fontSize="md" fontWeight="bold">
            1,465
          </Text>
        </Box>
      </Flex>

      {/* SVG circular + texto central */}
      <Flex justify="center" align="center">
        <Box position="relative" width="200px" height="200px">
          {/* SVG que dibuja el anillo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="100 100 200 200"
            style={{ transform: "rotate(299deg)", overflow: "visible" }}
          >
            {/* Gradiente para el trazo verde */}
            <linearGradient
              id="circleGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientTransform="rotate(90, .5, .5)"
            >
              <stop offset="0" stopColor="rgba(5, 205, 153, 0)" />
              <stop offset="100" stopColor="#05CD99" />
            </linearGradient>

            {/* Círculo base (transparente) */}
            <circle
              cx="200"
              cy="200"
              r="92.5"
              stroke="transparent"
              strokeWidth="15"
              fill="none"
            />

            {/* Círculo animado (verde) */}
            <circle
              cx="200"
              cy="200"
              r="92.5"
              fill="none"
              strokeWidth="15"
              strokeDasharray="581.1946409141117"
              strokeDashoffset="174.3583922742335"
              strokeLinecap="round"
              stroke="url(#circleGradient)"
              style={{ transition: "stroke-dashoffset 400ms" }}
            />
          </svg>

          {/* Contenido centrado en el medio del círculo */}
          <Box
            position="absolute"
            inset={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="sm" color="gray.500">
              Safety
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              9.3
            </Text>
            <Text fontSize="sm" color="gray.500">
              Total Score
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
