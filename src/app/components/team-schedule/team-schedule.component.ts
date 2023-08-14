import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { TEAMS } from 'src/app/data/teams';
import { DataImportService } from 'src/app/services/data-import.service';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss'],
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
          return games.filter(
            (game) =>
              game.leftTeam.number === teamNumber ||
              game.rightTeam.number === teamNumber
          );
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
