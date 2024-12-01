import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../colors";
const linkTheme = defineStyleConfig({
  baseStyle: {
    color: colors.Blue[800],
    _hover: {
      color: colors.Blue[600],
      textDecoration: "none",
    },
    _focus: {
      outline: "none",
    },
    _active: {
      color: colors.Blue[900],
    },
    _disabled: {
      color: colors.Gray[400],
      cursor: "not-allowed", 
      textDecoration: "none", 
    },
  },
  sizes: {
    lg: {
      fontSize: "18px",
    },
    md: {
      fontSize: "16px",
    },
    sm: {
      fontSize: "14px",
    },
  },
  variants: {
    primary: {
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
    },
    subtle: {
      color: colors.Gray[700],
      _hover: {
        color: colors.Gray[900],
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});

export { linkTheme };
