import { Location } from './locations';
import { Team } from './teams';
import { Time } from './times';

export interface Game {
  time: Time;
  location: Location;
  leftTeam: Team;
  leftTeamPoints?: number;
  rightTeam: Team;
  rightTeamPoints?: number;
}
