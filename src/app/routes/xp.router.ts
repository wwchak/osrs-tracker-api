
import express from 'express';
import { API } from '../../config/api';
import { XpRepository } from '../repositories/xp.repository';
import { Logger } from '../common/logger';

export class XpRouter {

  static create(app: express.Application): void {
    const router = express.Router();

    this.insertInitialXpDatapoint(router);
    this.getXpDatapointsForPlayer(router);

    app.use('/xp', router);
  }

  private static insertInitialXpDatapoint(router: express.Router): void {
    router.post('/:username/initialDatapoint', (req, res) => {
      API.getDbConnection(connection =>
        XpRepository.insertInitialXpDatapoint(req.params.username, req.body.xpString, connection).then(({ statusCode }) => {
          Logger.log(statusCode, 'POST /xp/:username/initialDatapoint', { username: req.params.username, xpString: req.body.xpString });
          res.status(statusCode);
          res.send();
        })
      );
    });
  }

  private static getXpDatapointsForPlayer(router: express.Router): void {
    router.get('/:username/:period?', (req, res) => {
      API.getDbConnection(connection =>
        XpRepository.getXpDatapoints(req.params.username, +req.params.period, +req.query.offset, connection).then(({ statusCode, xpDatapoints }) => {
          Logger.log(statusCode, 'GET /xp/:username/:period?', { username: req.params.username, period: req.params.period, offset: req.query.offset });
          res.status(statusCode);
          res.send(xpDatapoints);
        })
      );
    });
  }

}
