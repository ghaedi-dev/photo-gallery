import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: import('./palette'),
  typography: import('./typography'),
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
