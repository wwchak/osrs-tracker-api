import { Application, Router } from 'express';
import { SqlUtils } from '../common/utils/sql-utils';
import { NewsRepository } from '../repositories/news.repository';
import { RouterFactory } from './router.interface';

export class NewsRouter implements RouterFactory {
  create(app: Application): void {
    const router = Router();

    this.getNewsPost(router);
    this.getNewsPosts(router);
    this.upvote(router);
    this.downvote(router);

    app.use('/news', router);
  }

  private getNewsPost(router: Router): void {
    router.get('/:id', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        NewsRepository.getNewsItem(req.params.id, req.query.uuid, connection).then(({ statusCode, newsPost }) => {
          res.status(statusCode);
          res.send(newsPost);
        })
      );
    });
  }

  private getNewsPosts(router: Router): void {
    router.get('/', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        NewsRepository.getNewsItems(req.query.uuid, +req.query.offset, connection).then(({ statusCode, newsPosts }) => {
          res.status(statusCode);
          res.send(newsPosts);
        })
      );
    });
  }

  private upvote(router: Router): void {
    router.post('/upvote', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        NewsRepository.upvote(req.body.newsId, req.body.uuid, connection).then(({ statusCode }) => {
          res.status(statusCode);
          res.send();
        })
      );
    });
  }

  private downvote(router: Router): void {
    router.post('/downvote', (req, res) => {
      SqlUtils.getDbConnection(connection =>
        NewsRepository.downvote(req.body.newsId, req.body.uuid, connection).then(({ statusCode }) => {
          res.status(statusCode);
          res.send();
        })
      );
    });
  }
}
