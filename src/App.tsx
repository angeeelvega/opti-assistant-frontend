import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import theme from './styles/theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { MsalProvider } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';

interface AppProps {
  instance: IPublicClientApplication;
}

function App({ instance }: AppProps) {
  return (
    <BrowserRouter>
      <MsalProvider instance={instance}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
          </ThemeProvider>
        </AuthProvider>
      </MsalProvider>
    </BrowserRouter>
  );
}

export default App;
