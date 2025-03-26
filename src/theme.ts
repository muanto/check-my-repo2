import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/nunito"; // Example font

// Define your custom theme
const theme = extendTheme({
  fonts: {
    heading: `Nunito`,
    body: `Nunito`,
  },
});

export default theme;
