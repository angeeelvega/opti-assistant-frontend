import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/msalConfig';
import { InteractionStatus } from '@azure/msal-browser';

export const useMicrosoftAuth = () => {
  const { instance, inProgress } = useMsal();

  const handleMicrosoftLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (inProgress === InteractionStatus.None) {
      try {
        await instance.loginRedirect({
          ...loginRequest,
          prompt: 'select_account'
        });
      } catch (error) {
        console.error('Error initiating Microsoft login:', error);
      }
    }
  };

  return { handleMicrosoftLogin };
};