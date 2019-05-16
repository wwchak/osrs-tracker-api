import { readFileSync } from 'fs';
import { PoolConfig } from 'mysql';
import { IConfig } from './config.interface';

const dbCredentials: PoolConfig = JSON.parse(readFileSync('src/config/secrets/db-osrs-tracker.json', 'utf8'));

export const config: IConfig = {
  port: Number(process.env.PORT) || 8080,
  poolConfig: Object.assign(dbCredentials, {
    ssl: {
      ca: readFileSync('src/config/secrets/db-ca.pem'),
      cert: readFileSync('src/config/secrets/db-client-cert.pem'),
      key: readFileSync('src/config/secrets/db-client-key.pem'),
    },
  }),
};
