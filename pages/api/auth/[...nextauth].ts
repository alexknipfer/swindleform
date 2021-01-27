import { appConfig } from '@/config/appConfig';
import { Workspace } from '@/models/workspace';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

import { db } from '../../../models';

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
  events: {
    async createUser(message) {
      await db.ensureConnection();
      const workspace = new Workspace();
      workspace.init();
      workspace.addUser({ userId: message.id });
      workspace.updateName({ name: 'default' });
      await db.workspaceRepo.commit(workspace, {});
      await db.users.findOneAndUpdate(
        { _id: message.id },
        { $set: { workspaces: [workspace.id] } },
      );
    },
  },
  callbacks: {
    // TODO - better types
    async session(session: any, user: any) {
      if (user && !session.user.id) {
        session.user.id = user.id;
      }

      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
