import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Game {
  gameDateTime: string;
  gameTypeLong: string;
  teamAId: number;
  teamAName: string;
  teamBId: number;
  teamBName: string;
  venue: string;
  venueZip: number;
  leagueLong: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShvApiService {
  private readonly shvApiToken = '';

  games$: Observable<Game[]> = this.httpClient.get<Game[]>(
    'https://clubapi.handball.ch/rest/v1/clubs/140384/games',
    {
      headers: {
        Authorization: 'Basic ' + this.shvApiToken,
      },
    }
  );

  constructor(private httpClient: HttpClient) {}
}
