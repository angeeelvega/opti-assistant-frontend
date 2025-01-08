import { Button, Checkbox, FormGroup, Input } from '@mui/material';
import { User } from '../../types/auth';

interface LoginFormProps {
  username: string;
  password: string;
  acceptTerms: boolean;
  error: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTermsChange: (checked: boolean) => void;
  onSubmit: () => void;
  onSuccess?: (userData: User, token: string) => Promise<void>;
  handleMicrosoftLogin: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const LoginForm = ({
  username,
  password,
  acceptTerms,
  error,
  loading,
  onUsernameChange,
  onPasswordChange,
  onTermsChange,
  onSubmit,
  handleMicrosoftLogin,
}: LoginFormProps) => {
  return (
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
          onChange={e => onUsernameChange(e.target.value)}
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
          onChange={e => onPasswordChange(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Checkbox
          color="secondary"
          checked={acceptTerms}
          onChange={e => onTermsChange(e.target.checked)}
        />
        <label htmlFor="terms" className="text-gray-600">
          Acepto los términos y condiciones para el tratamiento de mis datos.
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
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>

      <div className="text-center mt-6 w-full">
        <div className="flex justify-center gap-4 mb-4">
          <div id="googleButton" className="flex justify-center"></div>
          <div id="microsoftButton">
            <Button
              variant="contained"
              className="flex items-center justify-center rounded-md"
              style={{
                textTransform: 'none',
                backgroundColor: '#000000',
                height: '40px',
                width: '40px',
                minWidth: '40px',
                padding: 0,
                color: '#ffffff',
              }}
              onClick={handleMicrosoftLogin}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
                <rect
                  x="1"
                  y="12.5"
                  width="10.5"
                  height="10.5"
                  fill="#00A4EF"
                />
                <rect
                  x="12.5"
                  y="1"
                  width="10.5"
                  height="10.5"
                  fill="#7FBA00"
                />
                <rect
                  x="12.5"
                  y="12.5"
                  width="10.5"
                  height="10.5"
                  fill="#FFB900"
                />
              </svg>
            </Button>
          </div>
        </div>
        <Button className="text-center w-full mb-5 mt-4" color="secondary">
          No tengo usuario de red
        </Button>
      </div>
    </FormGroup>
  );
};

export default LoginForm;
