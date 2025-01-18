import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../colors";

const stepperTheme = defineStyleConfig({
    baseStyle: {
        stepper: {
            gap: "0px"
        },
        step: {
            gap: "0px"
        },
        indicator: {
            borderRadius: "100%",
            // Estilo para los pasos activos
            '[data-status="active"] &': {
                background: colors.Neutral[50],
                borderColor: colors.Yellow[400],
            },

            // Estilo para los pasos completados
            '[data-status="complete"] &': {
                background: colors.Neutral[50],
                borderColor: colors.Blue[400],
                border: `2px solid ${colors.Blue[400]}`
            },

            // Estilo para los pasos inactivos
            '[data-status="incomplete"] &': {
                borderColor: colors.Slate[200],
            },
        },
        separator: {
            width: "20p x",
            height: "2px",
            margin: "0px !important",
            '[data-status="active"] &': {
                background: colors.Slate[200],
            },
            '[data-status="complete"] &': {
                background: colors.Blue[400],
            },
            '[data-status="incomplete"] &': {
                background: colors.Slate[200],
            },
        },

    },

    variants: {
        primary: {
            textDecoration: "none",
            _hover: {
                textDecoration: "none",
            },
        },
    },
    defaultProps: {
        size: "md",
        variant: "primary",
    },
});

export { stepperTheme };
