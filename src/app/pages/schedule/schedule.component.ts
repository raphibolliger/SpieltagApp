import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { LocationScheduleComponent } from '../../components/location-schedule/location-schedule.component';
import { TimeScheduleComponent } from '../../components/time-schedule/time-schedule.component';
import { TeamScheduleComponent } from '../../components/team-schedule/team-schedule.component';
import { AsyncPipe } from '@angular/common';

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    imports: [MatButtonToggleGroup, MatButtonToggle, RouterLink, LocationScheduleComponent, TimeScheduleComponent, TeamScheduleComponent, AsyncPipe]
})
export class ScheduleComponent {
  readonly mode$: Observable<'team' | 'location' | 'time'> =
    this.route.queryParamMap.pipe(
      map((paramMap) => {
        const modeString = paramMap.get('mode');
        switch (modeString) {
          case 'location':
            return 'location';
          case 'time':
            return 'time';
          default:
            return 'team';
        }
      })
    );

  constructor(private route: ActivatedRoute) {}
}
