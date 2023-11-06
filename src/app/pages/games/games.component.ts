import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { ShvApiService } from 'src/app/services/shv-api.service';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  readonly showOnlyHomeControl = new FormControl<boolean>(false);
  readonly dateControl = new FormControl<Date | null>(null);

  gamesInWohlen$ = this.showOnlyHomeControl.valueChanges.pipe(
    startWith(this.showOnlyHomeControl.value),
    switchMap((showOnlyHome) =>
      this.shvApi.games$.pipe(
        map((games) => {
          if (showOnlyHome) {
            return games.filter((game) => game.venueZip === 5610);
          }
          return games;
        }),
        map((games) =>
          games.sort((a, b) => a.gameDateTime.localeCompare(b.gameDateTime))
        )
      )
    )
  );

  constructor(private shvApi: ShvApiService) {}
}
