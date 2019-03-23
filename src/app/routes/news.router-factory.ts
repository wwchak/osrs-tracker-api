import { Application, Router } from 'express';
import { API } from '../../config/api';
import { Logger } from '../common/logger';
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
      API.getDbConnection(connection =>
        NewsRepository.getNewsItem(req.params.id, req.query.uuid, connection).then(({ statusCode, newsPost }) => {
          Logger.log(statusCode, 'GET /news/:id', { id: req.params.id, uuid: req.query.uuid });
          res.status(statusCode);
          res.send(newsPost);
        })
      );
    });
  }

  private getNewsPosts(router: Router): void {
    router.get('/', (req, res) => {
      API.getDbConnection(connection =>
        NewsRepository.getNewsItems(req.query.uuid, +req.query.offset, connection).then(({ statusCode, newsPosts }) => {
          Logger.log(statusCode, 'GET /news', { uuid: req.query.uuid, offset: req.query.offset });
          res.status(statusCode);
          res.send(newsPosts);
        })
      );
    });
  }

  private upvote(router: Router): void {
    router.post('/upvote', (req, res) => {
      API.getDbConnection(connection =>
        NewsRepository.upvote(req.body.newsId, req.body.uuid, connection).then(({ statusCode }) => {
          Logger.log(statusCode, 'POST /news/upvote', { id: req.body.newsId, uuid: req.body.uuid });
          res.status(statusCode);
          res.send();
        })
      );
    });
  }

  private downvote(router: Router): void {
    router.post('/downvote', (req, res) => {
      API.getDbConnection(connection =>
        NewsRepository.downvote(req.body.newsId, req.body.uuid, connection).then(({ statusCode }) => {
          Logger.log(statusCode, 'POST /news/downvote', { id: req.body.newsId, uuid: req.body.uuid });
          res.status(statusCode);
          res.send();
        })
      );
    });
  }
}
