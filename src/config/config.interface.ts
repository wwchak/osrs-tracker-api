import { PoolConfig } from 'mysql';

export interface IConfig {
  port: number;
  portMetrics: number;
  poolConfig: PoolConfig;
}
