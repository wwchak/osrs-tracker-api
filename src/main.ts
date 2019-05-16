import cluster from 'cluster';
import os from 'os';
import { App } from './app/app';
import { FileSystemUtils } from './app/common/file-system-utils';
import { Logger } from './app/common/logger';

if (cluster.isMaster) {
  FileSystemUtils.createIconsFolderIfMissing();
  Logger.log('OSRS TRACKER API ACTIVE - FORKING WORKERS');

  os.cpus().forEach(() => cluster.fork());

  cluster.on('exit', worker => {
    Logger.log(`WORKER ${worker.id} DIED - CREATING NEW WORKER`);
    cluster.fork();
  });
} else {
  new App().start(cluster.worker);
}
