import { Application, Router } from 'express';
import { API } from '../../config/api';
import { HealthRepository } from '../repositories/health.repository';
import { RouterFactory } from './router.interface';

export class HealthRouterFactory implements RouterFactory {
  create(app: Application): void {
    const router = Router();

    this.healthcheck(router);

    app.use('/health', router);
  }

  private healthcheck(router: Router): void {
    router.get('/', async (req, res) => {
      try {
        await API.getDbConnection(connection =>
          HealthRepository.checkConnection(connection).then(result =>
            res.status(result.success ? 200 : 500).send(result.success ? 'HEALTHY' : 'UNHEALTHY')
          )
        );
      } catch (e) {
        res.status(500).send('UNHEALTHY');
      }
    });
  }
}
