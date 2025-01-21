import { Avatar, AvatarBadge, Image } from "@chakra-ui/react";
import premium from "../../assets/images/premium.png";
import { colors } from "~/styles/colors";


export const AvatarCircle = () => {
   
  return (
    <Avatar name="Andres Parra" w={"40px"} h={"40px"} bg={colors.Blue[500]} color={"white"}>
    <AvatarBadge boxSize="1.25em" border={"1px solid transparent"}>
      <Image src={premium} alt="premium" />
    </AvatarBadge>
  </Avatar>
  );
};
