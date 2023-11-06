import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { GamesComponent } from './pages/games/games.component';

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'games', component: GamesComponent },
  { path: '**', redirectTo: '/schedule', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
