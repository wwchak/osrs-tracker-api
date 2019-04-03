import bodyParser from 'body-parser';
import { Worker } from 'cluster';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { API } from '../config/api';
import { Logger } from './common/logger';
import { HealthRouterFactory } from './routes/health.router-factory';
import { IconRouter } from './routes/icon.router-factory';
import { ItemRouter } from './routes/item.router-factory';
import { NewsRouter } from './routes/news.router-factory';
import { PlayerRouter } from './routes/player.router-factory';
import { RouterFactory } from './routes/router.interface';
import { XpRouter } from './routes/xp.router';

export class App {
  private _app: Application;

  constructor() {
    this._app = express();

    this.setupMiddleware();
    this.setupRouters();
  }

  start(worker: Worker): void {
    this._app.listen(API.CONFIG.PORT, () => {
      Logger.log(`WORKER ${worker.id} CREATED ON PORT ${API.CONFIG.PORT}`);
      this.setupRouters();
    });
  }

  private setupMiddleware(): void {
    this._app.use(compression());
    this._app.use(helmet({ noCache: true }));
    this._app.use(cors());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(bodyParser.json());
  }

  private setupRouters(): void {
    const routerFactories: RouterFactory[] = [
      new HealthRouterFactory(),
      new IconRouter(),
      new ItemRouter(),
      new NewsRouter(),
      new PlayerRouter(),
      new XpRouter(),
    ];
    routerFactories.forEach(routerFactory => routerFactory.create(this._app));
  }
}
