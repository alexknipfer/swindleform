import 'reflect-metadata';
const isServer = !!process.browser;

function loadServerEnvVar(key: string) {
  const value = process.env[key];

  if (isServer && !value) {
    throw new Error(`Environment variable ${key} is requird on server`);
  }

  return value;
}

// function loadClientEnvVar(key: string) {
//   const value = process.env[key];

//   if (!isServer && !value) {
//     throw new Error(`Environment variable ${key} is requird on client`);
//   }

//   return value;
// }

export const appConfig = {
  postgres: {
    url: loadServerEnvVar('POSTGRES_URL'),
  },
};

export type AppConfig = typeof appConfig;
