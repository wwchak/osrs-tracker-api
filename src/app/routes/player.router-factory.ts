import { Application, Router } from 'express';
import { API } from '../../config/api';
import { Logger } from '../common/logger';
import { PlayerRepository } from '../repositories/player.repository';
import { RouterFactory } from './router.interface';

export class PlayerRouter implements RouterFactory {
  create(app: Application): void {
    const router = Router();

    this.getPlayer(router);
    this.insertPlayer(router);

    app.use('/player', router);
  }

  private getPlayer(router: Router): void {
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

  private insertPlayer(router: Router): void {
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
