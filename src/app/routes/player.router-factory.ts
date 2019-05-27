import { Application, Router } from 'express';
import { SqlUtils } from '../common/utils/sql-utils';
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
      SqlUtils.getDbConnection(connection =>
        PlayerRepository.getPlayer(req.params.username, connection).then(({ statusCode, player }) => {
          res.status(statusCode);
          res.send(player);
        })
      );
    });
  }

  private insertPlayer(router: Router): void {
    router.post('/', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        PlayerRepository.insertPlayer(req.body, connection).then(({ statusCode }) => {
          res.status(statusCode);
          res.send();
        })
      );
    });
  }
}
