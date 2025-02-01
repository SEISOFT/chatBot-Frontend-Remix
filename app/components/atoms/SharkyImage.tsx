import { Image, ImageProps } from "@chakra-ui/react";
import Sharky from "../../assets/images/sharky.png";
import SharkySmall from "../../assets/images/sharky-small.png";

interface SharkyImageProps extends ImageProps {
  type?: "small" | "large";
}

export const SharkyImage = (props: SharkyImageProps) => {
  const src = props.type === "small" ? SharkySmall : Sharky;
  return <Image src={src} alt="Sharky" loading="lazy" {...props} />;
};
