import { Flex, Heading } from "@chakra-ui/react";
import { colors } from "~/styles/colors";
import { SharkyProfile } from "../atoms/SharkyProfile";

interface SharkyBannerProps {
  isCollapsed: boolean;
}

export const SharkyBanner = ({ isCollapsed }: SharkyBannerProps) => {
  return (
    <Flex alignItems="center" justifyContent="start" gap={4} minH={"42px"}>
      <SharkyProfile w={10} minW={10} />
      {!isCollapsed && (
        <Heading
          as="h1"
          fontSize={"28px"}
          fontWeight="bold"
          textAlign="center"
          color={colors.Blue[800]}
          letterSpacing={1}
          pt={2}
          variant={"sharky"}
        >
          Sharky
        </Heading>
      )}
    </Flex>
  );
};
