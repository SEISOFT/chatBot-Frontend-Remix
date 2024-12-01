import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../colors";

const primary = defineStyle({
  bgColor: colors.Blue[800],
  borderColor: "transparent",
  color: "white",
  rounded: "6px",
  _hover: {
    bgColor: colors.Blue[600],
  },
  _active: {
    bgColor: colors.Blue[900],
  },
  _pressed: {
    bgColor: colors.Blue[900],
  },
  _focus: {
    outline: "none",
  },
  _disabled: {
    bgColor: colors.Gray[200],
    color: colors.Gray[400],
  },
});

const secondary = defineStyle({
  bgColor: "transparent",
  borderColor: colors.Blue[800],
  color: colors.Blue[800],
  rounded: "6px",
  _hover: {
    borderColor: colors.Blue[600],
    color: colors.Blue[600],
  },
  _active: {
    borderColor: colors.Blue[900],
    color: colors.Blue[900],
  },
  _focus: {
    outline: "none",
  },
  _disabled: {
    borderColor: colors.Gray[200],
    color: colors.Gray[400],
  },
});

const ghost = defineStyle({
  bgColor: "transparent",
  borderColor: "transparent",
  color: colors.Blue[700],
  _hover: {
    color: colors.Blue[500],
  },
  _focus: {
    outline: "none",
  },
  _active: {
    color: colors.Blue[900],
  },
});

const link = defineStyle({
  bgColor: "transparent",
  borderColor: "transparent",
  color: colors.Blue[700],
  _hover: {
    color: colors.Blue[500],
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
  },
});

const buttonTheme = defineStyleConfig({
  baseStyle: {
    border: "2px",
    borderColor: "transparent",
    borderRadius: "50px",
    fontFamily: "Inter",
    fontWeight: "600",
    justifyContent: "center",
    lineHeight: 1.6,
  },
  sizes: {
    lg: {
      fontSize: "18px",
      h: "auto",
      minW: 0,
      p: "12px 32px",
    },
    md: {
      fontSize: "16px",
      h: "auto",
      minW: 0,
      p: "8px 24px",
    },
    sm: {
      fontSize: "14px",
      h: "auto",
      minW: 0,
      p: "6px 16px",
    },
  },
  variants: {
    ghost,
    link,
    primary,
    secondary,
  },
});

export { buttonTheme };
