import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import theme from './styles/theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
