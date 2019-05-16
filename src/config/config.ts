import { readFileSync } from 'fs';
import { PoolConfig } from 'mysql';
import { IConfig } from './config.interface';

const dbCredentials: PoolConfig = JSON.parse(readFileSync('/run/secrets/db-osrs-tracker.json', 'utf8'));

export const config: IConfig = {
  port: Number(process.env.PORT) || 8080,
  poolConfig: Object.assign(dbCredentials, {
    ssl: {
      ca: readFileSync('/run/secrets/db-ca.pem'),
      cert: readFileSync('/run/secrets/db-client-cert.pem'),
      key: readFileSync('/run/secrets/db-client-key.pem'),
    },
  }),
};
