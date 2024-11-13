import { Input, Button, Checkbox, FormGroup } from '@mui/material';

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
}: LoginFormProps) => (
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
      <div id="googleButton" className="flex justify-center"></div>
      <Button className="text-center w-full mb-5" color="secondary">
        No tengo usuario de red
      </Button>
    </div>
  </FormGroup>
);

export default LoginForm;
