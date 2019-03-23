import { Application } from 'express';

export interface RouterFactory {
  create(app: Application): void;
}
