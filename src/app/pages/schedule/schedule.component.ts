import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { LOCATIONS } from 'src/app/data/locations';
import { TEAMS } from 'src/app/data/teams';
import { DataImportService } from 'src/app/services/data-import.service';

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class TeamScheduleComponent {
  readonly initialTeamNumber: number;
  readonly initialLocationNumber: number;
  readonly teamControl;
  readonly locationControl;

  readonly teams = TEAMS;
  readonly locations = LOCATIONS;

  readonly mode$: Observable<'team' | 'location'> =
    this.route.queryParamMap.pipe(
      map((paramMap) => {
        const modeString = paramMap.get('mode');
        if (modeString === 'location') {
          return 'location';
        }
        return 'team';
      })
    );

  readonly games$ = this.dataImport.games$.pipe(
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

  readonly locationGames$ = this.dataImport.games$.pipe(
    switchMap((games) =>
      this.locationControl.valueChanges.pipe(
        startWith(this.initialLocationNumber),
        map((locationNumber) => {
          if (locationNumber) {
            localStorage.setItem('locationNumber', locationNumber.toString());
          }
          return games.filter(
            (game) => game.location.number === locationNumber
          );
        })
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private dataImport: DataImportService
  ) {
    // set initial team number
    const teamNumber = parseInt(localStorage.getItem('teamNumber') || '1');
    if (teamNumber > 0) {
      this.initialTeamNumber = teamNumber;
    } else {
      this.initialTeamNumber = 1;
    }
    this.teamControl = new FormControl(this.initialTeamNumber);

    // set initial location number
    const locationNumber = parseInt(
      localStorage.getItem('locationNumber') || '1'
    );
    if (locationNumber > 0) {
      this.initialLocationNumber = locationNumber;
    } else {
      this.initialLocationNumber = 1;
    }
    this.locationControl = new FormControl(this.initialLocationNumber);
  }
}
