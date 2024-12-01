import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const sharky = defineStyle({
    fontFamily: "Retroguard"
})

export const headingTheme = defineStyleConfig({
    variants: {
     sharky
    },
})