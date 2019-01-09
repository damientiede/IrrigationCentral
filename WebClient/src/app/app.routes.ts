// Import our dependencies
import { Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramComponent } from './program/program.component';
import { StepComponent } from './step/step.component';
import { HistoryComponent } from './history/history.component';
import { ConfigComponent } from './config/config.component';
import { SolenoidComponent } from './solenoid/solenoid.component';
import { AlarmComponent } from './alarm/alarm.component';
import { AnalogComponent } from './analog/analog.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { SpiComponent } from './spi/spi.component';
import { AuthGuard } from './shared/auth.guard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',  component: HomeComponent, },
  { path: 'callback', component: CallbackComponent },
  // { path: 'password',  component: PasswordComponent, },
  { path: 'device/:deviceid', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/programs', component: ProgramsComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/programs/:id', component: ProgramComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/programs/:programid/steps/:id', component: StepComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/solenoid/:id', component: SolenoidComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/alarm/:id', component: AlarmComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/analog/:id', component: AnalogComponent, canActivate: [AuthGuard] },
  { path: 'device/:deviceid/spi/:id', component: SpiComponent, canActivate: [AuthGuard] },
  // { path: '**',     component: StatusComponent },
];
