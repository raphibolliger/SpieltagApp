import { Location } from './locations';
import { Team } from './teams';
import { Time } from './times';

export type Game = {
  type: 'game';
  time: Time;
  location: Location;
  leftTeam: Team;
  leftTeamPoints?: number;
  rightTeam: Team;
  rightTeamPoints?: number;
};

export type Pause = {
  type: 'pause';
  time: Time;
  location: Location;
};
