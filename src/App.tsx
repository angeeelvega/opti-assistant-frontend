import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir de la raíz a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Ruta para el login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
