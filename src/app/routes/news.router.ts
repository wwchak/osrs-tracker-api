import express from 'express';
import { API } from '../../config/api';
import { NewsRepository } from '../repositories/news.repository';
import { Logger } from '../common/logger';

export class NewsRouter {

  static create(app: express.Application): void {
    const router = express.Router();

    this.getNewsPost(router);
    this.getNewsPosts(router);
    this.upvote(router);
    this.downvote(router);

    app.use('/news', router);
  }

  private static getNewsPost(router: express.Router): void {
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

  private static getNewsPosts(router: express.Router): void {
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

  private static upvote(router: express.Router): void {
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

  private static downvote(router: express.Router): void {
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
