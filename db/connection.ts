import { getConnectionManager } from 'typeorm';
import 'reflect-metadata';
import { appConfig } from 'config/appConfig';
import { User } from '@/entities/User';

export const manager = getConnectionManager();

const connection = manager.create({
  type: 'postgres',
  url: appConfig.postgres.url,
  entities: [User],
  migrations: ['../migrations/*.{js,ts}'],
  migrationsRun: true,
});

connection.connect();

export default {
  isConnected() {
    return connection.isConnected;
  },
  getConnection() {
    return manager.get('default');
  },
};
