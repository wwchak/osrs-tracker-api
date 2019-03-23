import { Application, Router } from 'express';
import { API } from '../../config/api';
import { Logger } from '../common/logger';
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
      API.getDbConnection(connection =>
        ItemRepository.getItem(req.params.id, connection).then(({ statusCode, items }) => {
          Logger.log(statusCode, 'GET /item/:id', { id: req.params.id, itemName: items && items[0].name });
          res.status(statusCode);
          res.send(items);
        })
      );
    });
  }

  private getItems(router: Router): void {
    router.get('/', (req, res) => {
      API.getDbConnection(connection =>
        ItemRepository.getItems(req.query.query, connection).then(({ statusCode, items }) => {
          Logger.log(statusCode, 'GET /item', { query: req.query.query, results: (items && items.length) || 0 });
          res.status(statusCode);
          res.send(items);
        })
      );
    });
  }
}
