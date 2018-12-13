import express from 'express';
import { API } from '../../config/api';
import { PlayerRepository } from '../repositories/player.repository';
import { Logger } from '../common/logger';

export class PlayerRouter {

  static create(app: express.Application): void {
    const router = express.Router();

    this.getPlayer(router);
    this.insertPlayer(router);

    app.use('/player', router);
  }

  private static getPlayer(router: express.Router): void {
    router.get('/:username', (req, res) => {
      API.getDbConnection(connection =>
        PlayerRepository.getPlayer(req.params.username, connection).then(({ statusCode, player }) => {
          Logger.log(statusCode, 'GET /player/:username', { username: req.params.username });
          res.status(statusCode);
          res.send(player);
        })
      );
    });
  }

  private static insertPlayer(router: express.Router): void {
    router.post('/', (req, res) => {
      API.getDbConnection(connection =>
        PlayerRepository.insertPlayer(req.body, connection).then(({ statusCode }) => {
          Logger.log(statusCode, 'POST /player', { player: req.body });
          res.status(statusCode);
          res.send();
        })
      );
    });
  }

}
