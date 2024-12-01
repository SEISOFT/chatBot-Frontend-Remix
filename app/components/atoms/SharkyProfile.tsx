import { Image, ImageProps } from "@chakra-ui/react";
import Sharky from "../../assets/images/sharky-profile.png";

export const SharkyProfile: React.FC<ImageProps> = (props) => {
  return (
    <Image src={Sharky} alt="Sharky" {...props} />
  );
};
