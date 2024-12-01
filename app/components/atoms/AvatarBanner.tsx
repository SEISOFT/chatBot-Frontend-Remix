import { Flex, Avatar, AvatarBadge, Image, Text } from "@chakra-ui/react";
import { colors } from "~/styles/colors";
import premium from "../../assets/images/premium.png";
import { useAuth } from "~/hooks/useAuth";

export const AvatarBanner: React.FC = () => {
  const { user } = useAuth();
  return (
    <Flex gap={4} alignItems={"center"}>
      <Avatar
        name="Andres Parra"
        w={"40px"}
        h={"40px"}
        bg={colors.Blue[500]}
        color={"white"}
      >
        <AvatarBadge boxSize="1.25em" border={"1px solid transparent"}>
          <Image src={premium} alt="premium" />
        </AvatarBadge>
      </Avatar>
      <Flex flexDir={"column"}>
        <Text color={colors.Slate[600]} fontWeight={"bold"}>
          Andres Parra
        </Text>
        <Text color={colors.Slate[400]}>{user?.email}</Text>
      </Flex>
    </Flex>
  );
};
