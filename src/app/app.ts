import bodyParser from 'body-parser';
import { Worker } from 'cluster';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import * as prometheusMetricsMiddleware from 'express-prom-bundle';
import helmet from 'helmet';
import { config } from '../config/config';
import { Logger } from './common/logger';
import { requestLogger } from './middleware/logger.middleware';
import { HealthRouterFactory } from './routes/health.router-factory';
import { IconRouter } from './routes/icon.router-factory';
import { ItemRouter } from './routes/item.router-factory';
import { NewsRouter } from './routes/news.router-factory';
import { PlayerRouter } from './routes/player.router-factory';
import { RouterFactory } from './routes/router.interface';
import { XpRouter } from './routes/xp.router';

export class App {
  private _app: Application;

  static run(worker: Worker): App {
    const app = new App();
    app.start(worker);
    return app;
  }

  private constructor() {
    this._app = express();

    this.setupMiddleware();
    this.setupRouters();
  }

  private start(worker: Worker): void {
    this._app.listen(config.port, () => {
      Logger.log(`WORKER ${worker.id} CREATED ON PORT ${config.port}`);
      this.setupRouters();
    });
  }

  private setupMiddleware(): void {
    this._app.use(compression());
    this._app.use(helmet({ noCache: true }));
    this._app.use(cors());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(bodyParser.json());
    this._app.use(requestLogger(['/health', '/metrics']));
    this._app.use(prometheusMetricsMiddleware({ includeMethod: true, includePath: true }));
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
