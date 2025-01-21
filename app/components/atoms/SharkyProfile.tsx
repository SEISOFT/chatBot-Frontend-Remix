import { Image, ImageProps } from "@chakra-ui/react";
import Sharky from "../../assets/images/sharky-profile.png";

export const SharkyProfile = (props: ImageProps) => {
  return <Image src={Sharky} alt="Sharky" loading="lazy" {...props} />;
};
