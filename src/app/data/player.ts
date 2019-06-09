import { PlayerType } from '../data/player-type';
import { PlayerState } from './player-state';

export class Player {
  constructor(
    public username: string,
    public playerType: PlayerType,
    public deIroned: PlayerState,
    public dead: boolean,
    public lastChecked: Date
  ) {}
}

export class DbPlayer {
  constructor(
    public id: number,
    public username: string,
    public type?: PlayerType,
    public deIroned?: PlayerState,
    public dead?: boolean,
    public lastChecked?: Date
  ) {}
}
