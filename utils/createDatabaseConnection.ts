import pgp from 'pg-promise';
import { appConfig } from '@/utils/appConfig';

export const createDatabaseConnection = () =>
  pgp()(appConfig.databaseConnectionString);
