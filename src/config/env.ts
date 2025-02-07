export const env = {
  IBM_SERVICE_URL: import.meta.env.VITE_IBM_SERVICE_URL,
  IBM_API_KEY: import.meta.env.VITE_IBM_API_KEY,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  CHAT_API_URL: import.meta.env.VITE_CHAT_API_URL,
  MICROSOFT_CLIENT_ID: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
  IBM_SPEECH_TO_TEXT_SERVICE_URL: import.meta.env
    .VITE_IBM_SPEECH_TO_TEXT_SERVICE_URL,
  IBM_SPEECH_TO_TEXT_API_KEY: import.meta.env.VITE_IBM_SPEECH_TO_TEXT_API_KEY,
  AUTHORITY: import.meta.env.VITE_AUTHORITY,
  REDIRECT_PATH: import.meta.env.VITE_REDIRECT_PATH,
  SCOPE: import.meta.env.VITE_SCOPE,
  MICROSOFT_AUTHORITY: import.meta.env.VITE_MICROSOFT_AUTHORITY,
  MICROSOFT_REDIRECT_URI: import.meta.env.VITE_MICROSOFT_REDIRECT_URI,
  MICROSOFT_SCOPE: import.meta.env.VITE_MICROSOFT_SCOPE,
  REDIRECT_LOGOUT_URI: import.meta.env.VITE_REDIRECT_LOGOUT_URI,
  validate() {
    const requiredVars = [
      'IBM_SERVICE_URL',
      'IBM_API_KEY',
      'GOOGLE_CLIENT_ID',
      'CHAT_API_URL',
      'IBM_SPEECH_TO_TEXT_SERVICE_URL',
      'IBM_SPEECH_TO_TEXT_API_KEY',
      'MICROSOFT_CLIENT_ID',
      'MICROSOFT_AUTHORITY',
    ];

    const missingVars = requiredVars.filter(
      varName => !env[varName as keyof typeof env],
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Variables de entorno faltantes: ${missingVars.join(', ')}`,
      );
    }
  },
} as const;

env.validate();
