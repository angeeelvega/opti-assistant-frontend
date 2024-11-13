export const env = {
  IBM_SERVICE_URL: import.meta.env.VITE_IBM_SERVICE_URL,
  IBM_API_KEY: import.meta.env.VITE_IBM_API_KEY,
  API_URL: import.meta.env.VITE_API_URL,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  CHAT_API_URL: import.meta.env.VITE_CHAT_API_URL,

  validate() {
    const requiredVars = [
      'IBM_SERVICE_URL',
      'IBM_API_KEY',
      'API_URL',
      'GOOGLE_CLIENT_ID',
      'CHAT_API_URL',
    ];

    const missingVars = requiredVars.filter(
      varName => !this[varName as keyof typeof env],
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Variables de entorno faltantes: ${missingVars.join(', ')}`,
      );
    }
  },
} as const;

env.validate();
