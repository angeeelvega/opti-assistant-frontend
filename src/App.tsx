import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
