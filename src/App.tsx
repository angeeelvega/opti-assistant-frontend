import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import theme from './styles/theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
