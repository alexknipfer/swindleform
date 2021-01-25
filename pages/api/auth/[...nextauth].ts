import { appConfig } from '@/config/appConfig';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

const options: InitOptions = {
  providers: [
    Providers.Email({
      server: {
        host: appConfig.mailgun.serverHost,
        port: appConfig.mailgun.serverPort,
        auth: {
          user: appConfig.mailgun.user,
          pass: appConfig.mailgun.password,
        },
      },
      from: appConfig.mailgun.emailFrom,
    }),
  ],
  database: appConfig.db.connectionString,
  pages: {
    signIn: '/login',
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
