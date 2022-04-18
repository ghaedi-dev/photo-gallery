import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Products from "./components/Products";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Products />
    </ThemeProvider>
  );
}

export default App;
