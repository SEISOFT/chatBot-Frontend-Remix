import { extendTheme } from '@chakra-ui/react';
import { headingTheme } from "./components/heading/theme";
import { colors } from "./colors";
import { buttonTheme } from "./components/button/theme";
import { inputTheme } from "./components/input/theme";
import { linkTheme } from "./components/link/theme";
import { menuTheme } from './components/menu/theme';
import { stepperTheme } from './components/stepper/theme';

const theme = extendTheme({
  breakpoints: {
    "3xl": "1638px",
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#ffffff",
        color: "gray.900",
      },
    },
  },
  colors,
  fonts: {
    body: "SNPro, sans-serif",
    heading: "SNPro, sans-serif",
  },
  components: {
    Heading: headingTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Link: linkTheme,
    Menu: menuTheme,
    Stepper: stepperTheme,
  }
});

export default theme;