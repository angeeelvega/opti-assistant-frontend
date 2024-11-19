import { useEffect } from 'react';
import { env } from '../config/env';
import { GoogleResponse } from '../types/auth';

export const useGoogleAuth = (
  onSuccess: (response: GoogleResponse) => void,
) => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: env.GOOGLE_CLIENT_ID,
        callback: (response: google.accounts.id.CredentialResponse) => {
          onSuccess({
            credential: response.credential,
            select_by: response.select_by,
            clientId: env.GOOGLE_CLIENT_ID,
          });
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleButton')!,
        {
          theme: 'filled_black',
          size: 'large',
          type: 'standard',
        },
      );
    }
  }, [onSuccess]);
};
