import { colors } from "~/styles/colors";
import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(menuAnatomy.keys)

const menuTheme = defineMultiStyleConfig({

    baseStyle: {
        list: {
            borderRadius: 'md',
           //border: 'none',
        },
    },
    variants: {
        primary: {
            button: {
                justifyContent: "center"
            },
            icon: {
                pr: "2",
                margin: '0px !important'
            },
            list: {
                py: '24px',
                px: '16px',
                display:"flex",
                flexDir: "column",
                gap: "4"
            },
            item: {
                p: '2',
                fontWeight: "bold",
                color: colors.Slate[600],
                bg: "white",
                borderRadius: "md",
                cursor: "pointer",
                fontSize: "14px",
                _hover: { bg: colors.Slate[100], color: colors.Blue[500] },
                margin: 0
            }
        }
    },
    defaultProps: {
        variant: "primary"
    }

})

export { menuTheme }