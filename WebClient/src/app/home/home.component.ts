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
  username: string;
  user: IUser;
  loaded = false;
  constructor(public authService: AuthService,
              private router: Router,
              private service: IrrigationControllerService) { }

  ngOnInit() {
    this.authService.getAccessToken(() => {
      this.username = this.authService.userProfile.name;
      this.getData();
    }, () => {
      this.loaded = true;
    });
  }
  getData() {
    this.service.getUser(this.username)
      .subscribe((data: IUser) => {
          this.user = data;
          this.loaded = true;
          console.log(this.user);
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
    return 'alert alert-secondary col-sm-12';
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
