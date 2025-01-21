import { Image, ImageProps } from "@chakra-ui/react";
import Sharky from "../../assets/images/sharky.png";

export const SharkyImage = (props: ImageProps) => {
  return <Image src={Sharky} alt="Sharky" loading="lazy" {...props} />;
};
