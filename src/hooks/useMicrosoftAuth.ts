import { useEffect } from 'react';
import * as msal from '@azure/msal-browser';
import { env } from '../config/env';
import { microsoftService } from '../services/microsoftService';

export const useMicrosoftAuth = (onSuccess: (userData: any) => void) => {
  useEffect(() => {
    if (!env.MICROSOFT_CLIENT_ID) {
      console.error('MICROSOFT_CLIENT_ID is not defined');
      return;
    }

    const msalConfig = {
      auth: {
        clientId: env.MICROSOFT_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin,
      },
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);

    msalInstance.initialize().then(() => {
      msalInstance.handleRedirectPromise().then(async (response) => {
        if (response) {
          try {
            const userId = await microsoftService.getUserIdByMicrosoftId(response.account.localAccountId);
            onSuccess({
              userId,
              token: response.accessToken,
              email: response.account.username
            });
          } catch (error) {
            console.error('Error processing Microsoft login:', error);
          }
        }
      });

      const loginRequest = {
        scopes: ["openid", "profile", "User.Read"],
      };

      const microsoftButton = document.getElementById('MicrosoftButton');
      if (microsoftButton) {
        microsoftButton.addEventListener('click', () => {
          msalInstance.loginRedirect(loginRequest);
        });
      }
    }).catch(error => {
      console.error('Error initializing MSAL:', error);
    });
  }, [onSuccess]);
};