import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import { NavService } from '../services/nav.service';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { ISchedule } from '../model/schedule';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  loaded = true;
  deviceid= 0;
  ticks = 0;
  device: IDevice;
  schedules: ISchedule[];
  constructor (private service: IrrigationControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavService ) {  }

  ngOnInit() {
  // extract route params
  this.route.params.subscribe((params: Params) => {
    this.deviceid = params['deviceid'];
    if (Number.isNaN(this.deviceid)) {
      alert('Missing Device ID');
    }
    this.getDevice(this.deviceid);
    const timer = Observable.timer(0, 5000);
    timer
      .takeUntil(this.router.events)
      .subscribe(t => {
        this.onTick(t);
      });
    });
  }
  onTick(t) {
    this.getDevice(this.deviceid);
    this.ticks = t;
  }

  getDevice(id: number) {
    console.log('getDevice()');
    this.service
      .getDevice(id)
      .subscribe((d: IDevice) => {
            console.log(d);
            this.device = d;
            this.getSchedules();
            this.loaded = true;
          },
          error => () => {
              console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  getSchedules() {
    console.log('getSchedules()');
    if (this.device != null) {
      this.service.getSchedules(this.device.id)
      .subscribe((data: ISchedule[]) => {
          this.schedules = data;
          console.log(data);
      });
    }
  }
  formatDate(date) {
    return moment.utc(date).format('DD MMM YYYY HH:mm');
  }
  editSchedule(s: ISchedule) {
    this.nav.NavTo(`/device/${this.device.id}/schedule/${s.id}`);
  }
  newSchedule() {
    this.nav.NavTo(`/device/${this.device.id}/schedule/new`);
  }
}
