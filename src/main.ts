import cluster from 'cluster';
import os from 'os';
import { App } from './app/app';
import { FileSystemUtil } from './app/common/file-system-util';
import { Logger } from './app/common/logger';

if (cluster.isMaster) {
  FileSystemUtil.createIconsFolderIfMissing();
  Logger.log('OSRS TRACKER API ACTIVE - FORKING WORKERS');

  os.cpus().forEach(() => cluster.fork());

  cluster.on('exit', (worker: cluster.Worker) => {
    Logger.log(`WORKER ${worker.id} DIED - CREATING NEW WORKER`);
    cluster.fork();
  });
} else {
  new App().start(cluster.worker);
}
