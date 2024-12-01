import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colors } from "../colors";
const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const inputTheme = defineMultiStyleConfig({
  baseStyle: {
    field: {
      _placeholder: {
        color: colors.Gray[400],
      },
      borderRadius: "8px",
      color: colors.Gray[800],
      fontSize: "14px",
      lineHeight: 1.6,
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: colors.Gray[300],
        _disabled: {
          bgColor: colors.Gray[100],
          borderColor: colors.Gray[200],
        },
        _focus: {
          borderColor: colors.Blue[600],
        },
        _hover: {
          borderColor: colors.Blue[500],
        },
        outline: "unset",
      },
    },
    filled: {
      field: {
        bgColor: colors.Gray[100],
        _hover: {
          bgColor: colors.Gray[200],
        },
        _focus: {
          bgColor: colors.Gray[100],
          borderColor: colors.Blue[600],
        },
        _disabled: {
          bgColor: colors.Gray[50],
          borderColor: colors.Gray[200],
        },
      },
    },
  },
  defaultProps: {
    variant: "outline",
  },
});

export { inputTheme };
