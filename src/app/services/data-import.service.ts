import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { Game } from '../data/schedule';
import { LOCATIONS } from '../data/locations';
import { TEAMS, Team } from '../data/teams';
import { Time } from '../data/times';

@Injectable({
  providedIn: 'root',
})
export class DataImportService {
  readonly games$: Observable<Game[]> = this.httpClient
    .get('assets/schedule.txt', {
      responseType: 'text',
      headers: {
        'Cache-Control':
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
    .pipe(
      shareReplay(1),
      tap((content) => console.log(content)),
      map((content) => {
        const lines = content.split('\n');

        const lineGames = lines.map((line, lineIndex) => {
          const fields = line.split('\t');
          const from = fields[0];
          const to = fields[1];

          const games = LOCATIONS.map((location, index) => {
            const locationIndex = index * 4;

            const leftString = fields[locationIndex + 2];
            const rightString = fields[locationIndex + 3];

            const left = parseInt(leftString);
            const leftTeam = TEAMS.find((team) => team.number === left);
            const right = parseInt(rightString);
            const rightTeam = TEAMS.find((team) => team.number === right);

            const time: Time = {
              number: lineIndex + 1,
              from,
              to,
            };

            const leftTeamPointsTemp = parseInt(fields[locationIndex + 4]);
            const rightTeamPointsTemp = parseInt(fields[locationIndex + 5]);

            let leftTeamPoints: number | undefined = undefined;
            let rightTeamPoints: number | undefined = undefined;
            if (leftTeamPointsTemp >= 0 && rightTeamPointsTemp >= 0) {
              if (
                leftTeamPointsTemp + rightTeamPointsTemp === 2 ||
                leftTeamPointsTemp + rightTeamPointsTemp === 3
              ) {
                leftTeamPoints = leftTeamPointsTemp;
                rightTeamPoints = rightTeamPointsTemp;
              } else {
                console.warn('Invalid points, sum is not 2 or 3');
              }
            }

            if (leftTeam && rightTeam) {
              const game: Game = {
                time,
                location,
                leftTeam,
                leftTeamPoints,
                rightTeam,
                rightTeamPoints,
              };
              return game;
            }

            return undefined;
          });

          return games.filter((game) => game !== undefined) as Game[];
        });

        const flatLineGames = lineGames.flat();
        return flatLineGames;
      })
    );

  constructor(private httpClient: HttpClient) {}
}
