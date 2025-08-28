import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { Pause } from 'src/app/data/game';
import { TEAMS } from 'src/app/data/teams';
import { TIMES } from 'src/app/data/times';
import { DataImportService } from 'src/app/services/data-import.service';
import { MatFormField, MatLabel, MatSelect, MatOption } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-team-schedule',
    templateUrl: './team-schedule.component.html',
    styleUrls: ['./team-schedule.component.scss'],
    imports: [
        MatFormField,
        MatLabel,
        MatSelect,
        ReactiveFormsModule,
        MatOption,
        AsyncPipe,
    ],
})
export class TeamScheduleComponent {
  readonly initialTeamNumber: number;
  readonly teamControl: FormControl<number | null>;
  readonly teams = TEAMS;

  readonly teamGames$ = this.dataImport.games$.pipe(
    switchMap((games) =>
      this.teamControl.valueChanges.pipe(
        startWith(this.initialTeamNumber),
        map((teamNumber) => {
          if (teamNumber) {
            localStorage.setItem('teamNumber', teamNumber.toString());
          }

          const teamGames = TIMES.map((t) => {
            const timeGames = games
              .filter((g) => g.time.number === t.number)
              .filter((g) => g.type === 'game');
            const teamGame = timeGames.find(
              (g) =>
                g.leftTeam.number === teamNumber ||
                g.rightTeam.number === teamNumber
            );

            if (!teamGame) {
              return <Pause>{ type: 'pause', time: t };
            }

            return teamGame;
          });

          return teamGames;
        })
      )
    )
  );

  constructor(private dataImport: DataImportService) {
    // set initial team number
    const teamNumber = parseInt(localStorage.getItem('teamNumber') || '1');
    if (teamNumber > 0) {
      this.initialTeamNumber = teamNumber;
    } else {
      this.initialTeamNumber = 1;
    }
    this.teamControl = new FormControl(this.initialTeamNumber);
  }
}
