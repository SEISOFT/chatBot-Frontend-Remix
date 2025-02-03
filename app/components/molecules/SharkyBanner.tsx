import { Flex, Heading } from "@chakra-ui/react";
import { colors } from "~/styles/colors";
import { SharkyProfile } from "../atoms/SharkyProfile";

interface SharkyBannerProps {
  isCollapsed: boolean;
}

export const SharkyBanner = ({ isCollapsed }: SharkyBannerProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent={"center"}
      gap={4}
      minH={9}
    >
      {isCollapsed && <SharkyProfile w={9} minW={9} />}
      {!isCollapsed && (
        <Heading
          as="h1"
          fontSize={"28px"}
          fontWeight="bold"
          textAlign="center"
          color={colors.Blue[800]}
          letterSpacing={1}
          variant={"sharky"}
        >
          Sharky
        </Heading>
      )}
    </Flex>
  );
};
