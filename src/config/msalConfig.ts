import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { env } from './env';
import { authService } from '../services/AuthService';
import { microsoftService } from '../services/microsoftService';

export const msalConfig: Configuration = {
  auth: {
    clientId: env.MICROSOFT_CLIENT_ID,
    authority: env.MICROSOFT_AUTHORITY,
    redirectUri: window.location.origin + '/home',
    postLogoutRedirectUri: window.location.origin + '/login',
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read']
};

const msalInstance = new PublicClientApplication(msalConfig);

// Inicializar la instancia
await msalInstance.initialize();

// Manejar la redirección después de la inicialización
await msalInstance.handleRedirectPromise()
  .then(async (response) => {
    if (response) {
      const msalAccount = response.account;
      msalInstance.setActiveAccount(msalAccount);
      
      try {
        const user_id = await microsoftService.verifyUserId(
          msalAccount.username,
          msalAccount.localAccountId
        );
        
        const newUserData = {
          id: user_id.toString(),
          email: msalAccount.username,
          name: msalAccount.name || '',
          provider: 'microsoft' as const,
          microsoft_id: msalAccount.localAccountId
        };

        authService.setUser(newUserData);
        sessionStorage.setItem('isAuthenticated', 'true');
      } catch (error) {
        console.error('Error verificando usuario:', error);
        sessionStorage.clear();
        await msalInstance.logoutRedirect({
          postLogoutRedirectUri: window.location.origin + '/login'
        });
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

export { msalInstance };