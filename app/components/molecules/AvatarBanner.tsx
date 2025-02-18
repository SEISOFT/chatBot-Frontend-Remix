import { Flex, Avatar, AvatarBadge, Image, Text } from "@chakra-ui/react";
import { colors } from "~/styles/colors";
import premium from "../../assets/images/premium.png";
import { useUser } from "~/hooks/useUser";

export const AvatarBanner = () => {
  const { user } = useUser();
  return (
    <Flex gap={4} alignItems={"center"}>
      <Avatar
        name={user?.username}
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
        <Text color={colors.Slate[800]} fontWeight={"bold"}>
          {user?.username}
        </Text>
        <Text color={colors.Slate[600]}>{user?.email}</Text>
      </Flex>
    </Flex>
  );
};
