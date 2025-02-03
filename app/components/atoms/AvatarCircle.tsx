import { Avatar, AvatarBadge, Image } from "@chakra-ui/react";
import premium from "../../assets/images/premium.png";
import { colors } from "~/styles/colors";

interface AvatarCircleProps {
  name: string;
}

export const AvatarCircle = ({ name }: AvatarCircleProps) => {
  return (
    <Avatar
      name={name}
      w={"34px"}
      h={"34px"}
      bg={colors.Blue[500]}
      color={"white"}
    >
      <AvatarBadge boxSize="1.25em" border={"1px solid transparent"}>
        <Image src={premium} alt="premium" />
      </AvatarBadge>
    </Avatar>
  );
};
