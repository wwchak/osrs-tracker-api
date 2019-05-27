import { Application, Router } from 'express';
import { SqlUtils } from '../common/utils/sql-utils';
import { ItemRepository } from '../repositories/item.repository';
import { RouterFactory } from './router.interface';

export class ItemRouter implements RouterFactory {
  create(app: Application): void {
    const router = Router();

    this.getItem(router);
    this.getItems(router);

    app.use('/item', router);
  }

  private getItem(router: Router): void {
    router.get('/:id', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        ItemRepository.getItem(req.params.id, connection).then(({ statusCode, items }) => {
          res.status(statusCode);
          res.send(items);
        })
      );
    });
  }

  private getItems(router: Router): void {
    router.get('/', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        ItemRepository.getItems(req.query.query, connection).then(({ statusCode, items }) => {
          res.status(statusCode);
          res.send(items);
        })
      );
    });
  }
}
