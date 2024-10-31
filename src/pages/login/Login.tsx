import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox, FormGroup } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (!acceptTerms) {
      setError('Debe aceptar los términos y condiciones');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Login con Google');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card__container bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-6 md:mx-0">
        <div className="flex justify-center mb-4">
          <img
            src="src/assets/img/logo-footer.png"
            alt="Logo"
            className="h-12 filter invert brightness-100"
          />
        </div>
        <FormGroup>
          <div className="mb-4">
            <Input
              type="text"
              disableUnderline={true}
              id="username"
              name="username"
              placeholder="Usuario"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              disableUnderline={true}
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <Checkbox
              color="secondary"
              checked={acceptTerms}
              onChange={e => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-gray-600">
              Acepto los términos y condiciones para el tratamiento de mis
              datos.
            </label>
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="w-full text-white p-2 rounded-md bg-black"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>

          <div className="text-center mt-4 w-full">
            <Button
              className="border border-gray-300 p-2 rounded-md w-full"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Acceder con Google
            </Button>
            <Button className="text-center mt-2 w-full" color="secondary">
              No tengo usuario de red
            </Button>
          </div>
        </FormGroup>
      </div>
    </div>
  );
};

export default Login;
