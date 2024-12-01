import { extendTheme } from '@chakra-ui/react';
import { headingTheme } from "./heading/theme";
import { colors } from "./colors";
import { buttonTheme } from "./button/theme";
import { inputTheme } from "./input/theme";
import { linkTheme } from "./link/theme";
import { menuTheme } from './menu/theme';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.50",
        color: "gray.900",
      },
    },
  },
  colors,
  fonts: {
    body: "Inter, sans-serif",
    heading: "Poppins, sans-serif",
  },
  components: {
    Heading: headingTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Link: linkTheme,
    Menu: menuTheme
  }
});

export default theme;