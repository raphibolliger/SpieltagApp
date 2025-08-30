import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { map, startWith, switchMap } from 'rxjs';
import { LOCATIONS } from 'src/app/data/locations';
import { DataImportService } from 'src/app/services/data-import.service';
import { GameResultColorPipe } from '../../pipes/game-result-color.pipe';

@Component({
  selector: 'app-location-schedule',
  templateUrl: './location-schedule.component.html',
  styleUrls: ['./location-schedule.component.scss'],
  imports: [MatFormField, MatLabel, MatSelect, ReactiveFormsModule, MatOption, NgClass, AsyncPipe, GameResultColorPipe],
})
export class LocationScheduleComponent {
  readonly initialLocationNumber: number;
  readonly locationControl: FormControl<number | null>;
  readonly locations = LOCATIONS;

  readonly locationGames$ = this.dataImport.games$.pipe(
    switchMap((games) =>
      this.locationControl.valueChanges.pipe(
        startWith(this.initialLocationNumber),
        map((locationNumber) => {
          if (locationNumber) {
            localStorage.setItem('locationNumber', locationNumber.toString());
          }
          const locationGames = games.filter((game) => game.location.number === locationNumber);
          return locationGames;
        }),
      ),
    ),
  );

  constructor(private dataImport: DataImportService) {
    // set initial location number
    const locationNumber = parseInt(localStorage.getItem('locationNumber') || '1');
    if (locationNumber > 0) {
      this.initialLocationNumber = locationNumber;
    } else {
      this.initialLocationNumber = 1;
    }
    this.locationControl = new FormControl(this.initialLocationNumber);
  }
}
