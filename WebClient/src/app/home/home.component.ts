import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CallbackComponent } from '../callback/callback.component';
import { IrrigationControllerService } from '../services/IrrigationController1.service';
import { IUser } from '../model/user';
import { IDevice } from '../model/device';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;
  user: IUser;
  loaded = false;
  numdevices = 0;
  userIsAuthenticated = false;
  userIsRegistered = false;
  constructor(public authService: AuthService,
              private router: Router,
              private service: IrrigationControllerService) { }

  ngOnInit() {
    this.authService.getAccessToken(() => {
      this.email = this.authService.userProfile.email;
      this.userIsAuthenticated = this.authService.authenticated;
      this.getData();
    }, () => {
      console.log(this.authService);
      this.loaded = true;
    });
  }
  getData() {
    this.service.getUser(this.email)
      .subscribe((data: IUser) => {
        this.user = data;
        this.userIsRegistered = true;
        if (data.Devices) {
          this.numdevices = data.Devices.length;
          if (data.Devices.length === 1) {
            this.router.navigate([`/device/${data.Devices[0].id}/status`]);
          }
        }
        this.loaded = true;
        console.log(this.user);
      },
      error => {
        console.log(error);
        if (error.status === 404 ) {
          this.userIsRegistered = false;
          this.loaded = true;
        }
      });
  }
  getStatusClass(d: IDevice) {
    if (d == null) {return; }
    const duration = this.lastSeenDuration(d);
    if (duration.as('seconds') > (30000)) {
      return 'alert alert-danger col-sm-12';
    }
    if (d.State.indexOf('Irrigating') > -1) { return 'alert alert-success col-sm-12'; }
    if (d.State.indexOf('Fault') > -1) { return 'alert alert-danger col-sm-12'; }
    if (d.Mode.indexOf('Manual') > -1) { return 'alert alert-secondary'; }
    return 'alert alert-primary col-sm-12';
  }
  getStatusText(d: IDevice) {
    if (d == null) {return 'Unknown device'; }
    let status = '';
    const duration = this.lastSeenDuration(d);
    if (duration.as('seconds') > (30000)) {
      status =  `Device offline for ${Math.floor(duration.as('minutes'))} minutes`;
    }
    status = d.Status;
    return `${d.Name} - ${status}`;
  }
  lastSeenDuration(d: IDevice) {
    if (d == null) {return; }
    const now = moment.utc();
    const ls = moment.utc(d.updatedAt);
    return moment.duration(now.diff(ls));
  }
  navToDevice(device: IDevice) {
    this.router.navigate([`/device/${device.id}/status`]);
  }
}
