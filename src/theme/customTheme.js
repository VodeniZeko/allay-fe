import { theme } from '@chakra-ui/core';

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    },
    selected: {
      500: '#259BF8'
    },
    unselected: {
      500: '#FDFDFF'
    }
  },
  fonts: {
    body: 'Muli, sans-serif',
    heading: 'Poppins, serif'
  }
};
export default customTheme;
