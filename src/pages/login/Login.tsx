import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí podrías manejar la autenticación
    // Si el inicio de sesión es exitoso:
    navigate('/home'); // Redirige a la página principal o donde desees
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-800">
      <div className="card__container bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-6 md:mx-0">
        <div className="flex justify-center mb-4">
          <img src="src/assets/img/icon.png" alt="Logo" className="h-12" />
        </div>
        <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-gray-600">
              Acepto los términos y condiciones para el tratamiento de mis
              datos.
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Ingresar
          </button>
          <div className="text-center mt-4">
            <button className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition duration-200">
              Acceder con Google
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-gray-600">No tengo usuario de red</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
