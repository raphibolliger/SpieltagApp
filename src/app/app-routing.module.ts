import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamScheduleComponent } from './pages/schedule/schedule.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: TeamScheduleComponent },
  { path: 'ranking', component: RankingComponent },
  { path: '**', redirectTo: '/schedule', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
