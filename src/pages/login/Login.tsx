import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/auth';
import { LoginError } from '../../types/errors';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import LoginForm from '../../components/LoginForm';
import Logo from '../../assets/img/logo-footer.png';
import { jwtDecode } from 'jwt-decode';

interface GoogleJwtPayload {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleCallback = async (response: any) => {
    try {
      setLoading(true);
      setError('');

      const decodedToken = jwtDecode<GoogleJwtPayload>(response.credential);

      const userData: User = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        provider: 'google',
      };

      await login(userData, response.credential);
      navigate('/home');
    } catch (err) {
      console.error('Error de Google login:', err);
      setError(LoginError.GOOGLE_ERROR);
    } finally {
      setLoading(false);
    }
  };

  useGoogleAuth(handleGoogleCallback);

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      setError(LoginError.INCOMPLETE_FIELDS);
      return;
    }

    if (!formData.acceptTerms) {
      setError(LoginError.TERMS_NOT_ACCEPTED);
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(formData.username, formData.password);
      navigate('/home');
    } catch (err) {
      setError(LoginError.INVALID_CREDENTIALS);
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card__container bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-6 md:mx-0">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="m-4 h-20 p-4 invert" />
        </div>
        <LoginForm
          {...formData}
          error={error}
          loading={loading}
          onUsernameChange={username => setFormData({ ...formData, username })}
          onPasswordChange={password => setFormData({ ...formData, password })}
          onTermsChange={acceptTerms =>
            setFormData({ ...formData, acceptTerms })
          }
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
