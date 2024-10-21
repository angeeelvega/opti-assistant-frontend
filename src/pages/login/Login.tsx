import { useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox, FormGroup } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Aquí podrías manejar la autenticación
    // Si el inicio de sesión es exitoso:
    navigate('/home'); // Redirige a la página principal o donde desees
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <Checkbox color="secondary" />
            <label htmlFor="terms" className=" text-gray-600">
              Acepto los términos y condiciones para el tratamiento de mis
              datos.
            </label>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="w-full  text-white p-2 rounded-md bg-black "
            onClick={() => {
              handleSubmit();
            }}
          >
            Ingresar
          </Button>
          <div className="text-center mt-4 w-full">
            <Button
              className="border border-gray-300 p-2 rounded-md w-full"
              color="secondary"
              startIcon={<GoogleIcon />}
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
