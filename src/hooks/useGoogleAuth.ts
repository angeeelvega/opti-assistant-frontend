import { useEffect } from 'react';
import { env } from '../config/env';

export const useGoogleAuth = (onSuccess: (response: any) => void) => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: env.GOOGLE_CLIENT_ID,
        callback: onSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleButton')!,
        {
          theme: 'filled_black',
          size: 'large',
        },
      );
    }
  }, [onSuccess]);
};
