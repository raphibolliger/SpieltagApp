import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { TIMES } from 'src/app/data/times';
import { DataImportService } from 'src/app/services/data-import.service';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.scss'],
})
export class TimeScheduleComponent {
  readonly times = TIMES;
  readonly timeFormControl: FormControl<number | null>;
  readonly initialTimeNumber: number;

  readonly timeGames$ = this.service.games$.pipe(
    switchMap((games) =>
      this.timeFormControl.valueChanges.pipe(
        startWith(this.initialTimeNumber),
        map((timeNumber) => {
          if (timeNumber) {
            localStorage.setItem('timeNumber', timeNumber.toString());
          }
          return games.filter((game) => game.time.number === timeNumber);
        })
      )
    )
  );

  constructor(private service: DataImportService) {
    // set initial team number
    const timeNumber = parseInt(localStorage.getItem('timeNumber') || '1');
    if (timeNumber > 0) {
      this.initialTimeNumber = timeNumber;
    } else {
      this.initialTimeNumber = 1;
    }
    this.timeFormControl = new FormControl(this.initialTimeNumber);
  }
}
