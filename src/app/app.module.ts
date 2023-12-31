import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeScheduleComponent } from './components/time-schedule/time-schedule.component';
import { TeamScheduleComponent } from './components/team-schedule/team-schedule.component';
import { LocationScheduleComponent } from './components/location-schedule/location-schedule.component';
import { GameResultColorPipe } from './pipes/game-result-color.pipe';
import { GamesComponent } from './pages/games/games.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    RankingComponent,
    TeamScheduleComponent,
    TimeScheduleComponent,
    LocationScheduleComponent,
    GameResultColorPipe,
    GamesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
