import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { msalInstance } from './config/msalConfig.ts';
import { EventType } from '@azure/msal-browser';

// Configurar cuenta activa por defecto
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Escuchar eventos de inicio de sesión
msalInstance.addEventCallback(event => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    'account' in event.payload!
  ) {
    msalInstance.setActiveAccount(event.payload.account!);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App instance={msalInstance} />
  </StrictMode>,
);
