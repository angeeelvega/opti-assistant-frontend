export interface User {
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};
