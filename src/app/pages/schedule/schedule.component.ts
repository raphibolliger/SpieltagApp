import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    standalone: false
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
