import { Application, Router } from 'express';
import { SqlUtils } from '../common/utils/sql-utils';
import { XpRepository } from '../repositories/xp.repository';
import { RouterFactory } from './router.interface';

export class XpRouter implements RouterFactory {
  create(app: Application): void {
    const router = Router();

    this.insertInitialXpDatapoint(router);
    this.getXpDatapointsForPlayer(router);

    app.use('/xp', router);
  }

  private insertInitialXpDatapoint(router: Router): void {
    router.post('/:username/initialDatapoint', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        XpRepository.insertInitialXpDatapoint(req.params.username, req.body.xpString, connection).then(
          ({ statusCode }) => {
            res.status(statusCode);
            res.send();
          }
        )
      );
    });
  }

  private getXpDatapointsForPlayer(router: Router): void {
    router.get('/:username/:period?', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        XpRepository.getXpDatapoints(req.params.username, +req.params.period, +req.query.offset, connection).then(
          ({ statusCode, xpDatapoints }) => {
            res.status(statusCode);
            res.send(xpDatapoints);
          }
        )
      );
    });
  }
}
