export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'email' | 'google' | 'microsoft';
  google_id?: string;
  microsoft_id?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: string | User, tokenOrPassword?: string) => Promise<void>;
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

export interface MicrosoftResponse {
  account: {
    homeAccountId: string;
    environment: string;
    tenantId: string;
    username: string;
    localAccountId: string;
    name: string;
  };
  accessToken: string;
  clientId: string;
}
