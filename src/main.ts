import cluster from 'cluster';
import * as express from 'express';
import { clusterMetrics } from 'express-prom-bundle';
import os from 'os';
import { App } from './app/app';
import { Logger } from './app/common/logger';
import { FileSystemUtils } from './app/common/utils/file-system-utils';
import { config } from './config/config';

if (cluster.isMaster) {
  FileSystemUtils.createIconsFolderIfMissing();
  Logger.log('OSRS TRACKER API ACTIVE - FORKING WORKERS');

  os.cpus().forEach(() => cluster.fork());

  const metricsApp = express();
  metricsApp.use('/metrics', clusterMetrics());
  metricsApp.listen(config.portMetrics);

  cluster.on('exit', worker => {
    Logger.log(`WORKER ${worker.id} DIED - CREATING NEW WORKER`);
    cluster.fork();
  });
} else {
  App.run(cluster.worker);
}
