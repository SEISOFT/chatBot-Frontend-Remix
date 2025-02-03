import { Flex, Text } from "@chakra-ui/react";
import { colors } from "~/styles/colors";

interface StatsCardsProps {
  statsData: Array<{
    label: string;
    value: number;
  }>;
  isSidebarCollapsed?: boolean;
}

export const StatsCards = ({
  statsData,
  isSidebarCollapsed,
}: StatsCardsProps) => {
  return (
    <Flex
      flexWrap={{
        base: "wrap",
      }}
      gap={4}
      height={"fit-content"}
      maxW={{
        base: "100%",

        xl: isSidebarCollapsed ? "416px" : "100%",
        "2xl": "524px",
      }}
    >
      {statsData.map((stat) => (
        <Flex
          key={stat.label}
          flex={{
            base: "unset",
            md: 1,
            lg: 1,
            xl: isSidebarCollapsed ? "unset" : 1,
            "2xl": "unset",
          }}
          width={{
            base: "100%",
            sm: "calc(50% - 8px)",
            md: "254px",
            lg: "200px",
            "2xl": "254px",
          }}
          p={4}
          h="130px"
          bg={"white"}
          borderRadius="2xl"
          boxShadow="base"
          flexDir="column"
          color={colors.Custom.textBlue}
          gap={4}
          alignItems="center"
          justifyContent="center"
          border={`1px solid ${colors.Gray[100]}`}
          borderBottom={"none"}
        >
          <Text fontWeight="black">{stat.label}</Text>
          <Text fontWeight="extrabold" fontSize="3xl">
            {stat.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
