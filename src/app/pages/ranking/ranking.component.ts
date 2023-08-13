import { Component } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { TEAMS, Team } from 'src/app/data/teams';
import { DataImportService } from 'src/app/services/data-import.service';

interface TeamRanking {
  team: Team;
  points: number;
  games: number;
  wins: number;
  losses: number;
  ties: number;
}

@Component({
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  readonly teams$: Observable<TeamRanking[]>;

  constructor(private dataService: DataImportService) {
    this.teams$ = of(TEAMS).pipe(
      switchMap((teams) =>
        this.dataService.games$.pipe(
          map((games) => {
            return teams
              .map((team) => {
                const teamGames = games.filter(
                  (game) =>
                    game.leftTeam.number === team.number ||
                    game.rightTeam.number === team.number
                );
                const teamRanking: TeamRanking = {
                  team,
                  points: teamGames.reduce((acc, game) => {
                    if (game.leftTeam.number === team.number) {
                      return acc + (game.leftTeamPoints || 0);
                    } else {
                      return acc + (game.rightTeamPoints || 0);
                    }
                  }, 0),
                  games: teamGames.reduce((acc, game) => {
                    if (game.leftTeam.number === team.number) {
                      return game.leftTeamPoints === undefined ? acc : acc + 1;
                    } else {
                      return game.rightTeamPoints === undefined ? acc : acc + 1;
                    }
                  }, 0),
                  wins: teamGames.reduce((acc, game) => {
                    if (game.leftTeam.number === team.number) {
                      return acc + (game.leftTeamPoints === 3 ? 1 : 0);
                    } else {
                      return acc + (game.rightTeamPoints === 3 ? 1 : 0);
                    }
                  }, 0),
                  losses: teamGames.reduce((acc, game) => {
                    if (game.leftTeam.number === team.number) {
                      return acc + (game.leftTeamPoints === 0 ? 1 : 0);
                    } else {
                      return acc + (game.rightTeamPoints === 0 ? 1 : 0);
                    }
                  }, 0),
                  ties: teamGames.reduce((acc, game) => {
                    if (game.leftTeam.number === team.number) {
                      return acc + (game.leftTeamPoints === 1 ? 1 : 0);
                    } else {
                      return acc + (game.rightTeamPoints === 1 ? 1 : 0);
                    }
                  }, 0),
                };
                return teamRanking;
              })
              .sort((a, b) => b.points - a.points);
          })
        )
      )
    );
  }
}
