const isServer = !!process.browser;

function loadServerEnvVar(key: string) {
  const value = process.env[key];

  if (isServer && !value) {
    throw new Error(`Environment variable ${key} is required on server`);
  }

  return value;
}

export const appConfig = {
  db: {
    connectionString: loadServerEnvVar('DATABASE_CONNECTION_STRING'),
  },
  mailgun: {
    user: loadServerEnvVar('EMAIL_SERVER_USER'),
    password: loadServerEnvVar('EMAIL_SERVER_PASSWORD'),
    serverHost: loadServerEnvVar('EMAIL_SERVER_HOST'),
    serverPort: Number(loadServerEnvVar('EMAIL_SERVER_PORT')),
    emailFrom: loadServerEnvVar('EMAIL_FROM'),
  },
};

export type AppConfig = typeof appConfig;
