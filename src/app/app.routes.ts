import { Routes } from '@angular/router';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'ranking', component: RankingComponent },
  { path: '**', redirectTo: '/schedule', pathMatch: 'full' },
];
