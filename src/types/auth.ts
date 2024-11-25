export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'email' | 'google';
  google_id?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    credentials: string | User,
    tokenOrPassword?: string,
  ) => Promise<void>;
  logout: () => void;
}

export const CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export interface GoogleResponse {
  credential: string;
  clientId: string;
  select_by: string;
}
