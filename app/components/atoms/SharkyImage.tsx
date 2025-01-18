import { Image, ImageProps } from "@chakra-ui/react";
import Sharky from "../../assets/images/sharky.png";

export const SharkyImage: React.FC<ImageProps> = (props) => {
  return <Image src={Sharky} alt="Sharky" {...props} />;
};
