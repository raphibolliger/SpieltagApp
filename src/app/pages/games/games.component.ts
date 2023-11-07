import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { ShvApiService } from 'src/app/services/shv-api.service';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  readonly showOnlyHomeControl = new FormControl<boolean>(true);
  readonly dateControl = new FormControl<Date | null>(null);

  gamesInWohlen$ = this.showOnlyHomeControl.valueChanges.pipe(
    startWith(this.showOnlyHomeControl.value),
    switchMap((showOnlyHome) =>
      this.dateControl.valueChanges.pipe(
        startWith(null),
        switchMap((date) =>
          this.shvApi.games$.pipe(
            map((games) => {
              let filteredGames = games;
              if (showOnlyHome) {
                filteredGames = games.filter((game) => game.venueZip === 5610);
              }
              if (date) {
                filteredGames = filteredGames.filter((game) => {
                  const gameDate = new Date(
                    game.gameDateTime
                  ).toLocaleDateString();
                  const filterDate = date.toLocaleDateString();
                  console.log(gameDate, filterDate);
                  return gameDate === filterDate;
                });
              }
              return filteredGames;
            }),
            map((games) =>
              games.sort((a, b) => a.gameDateTime.localeCompare(b.gameDateTime))
            )
          )
        )
      )
    )
  );

  constructor(private shvApi: ShvApiService) {}
}
