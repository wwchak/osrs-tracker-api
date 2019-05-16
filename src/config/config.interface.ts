import { PoolConfig } from 'mysql';

export interface IConfig {
  port: number;
  poolConfig: PoolConfig;
}
