import 'reflect-metadata';
import { Connection, ConnectionOptions, getConnectionManager } from 'typeorm';

import { appConfig } from '../config/appConfig';
import { User } from '../entities/User';
import { User1611536120958 } from '../migrations/1611536120958-User';

const options: Record<string, ConnectionOptions> = {
  default: {
    type: 'postgres',
    url: appConfig.postgres.url,
    entities: [
      User, // etc...
    ],
    migrations: [User1611536120958],
    migrationsRun: true,
  },
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[],
) {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export async function ensureConnection(name = 'default'): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (process.env.NODE_ENV !== 'production') {
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  return await connectionManager.create({ name, ...options[name] }).connect();
}
