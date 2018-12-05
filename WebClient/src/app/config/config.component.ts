import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import { NavService } from '../services/nav.service';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IDevice } from '../model/device';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { isMoment } from 'moment';
import { ISolenoid } from '../model/solenoid';
import { IAlarm } from '../model/alarm';
import { IAnalog } from '../model/analog';
import { ISpi } from '../model/spi';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  deviceid= 0;
  ticks= 0;
  device: IDevice;
  irrigationPrograms: IIrrigationProgram[];
  solenoids: ISolenoid[];
  solenoidsLoaded = false;
  alarms: IAlarm[];
  alarmsLoaded = false;
  analogs: IAnalog[];
  analogsLoaded = false;
  spis: ISpi[];
  spisLoaded = false;
  loaded = false;
  selection= 'Device';
  views: ['Device', 'Solenoids', 'Alarms', 'Analogs', 'SPIs'];
  activeView = 'Device';
  showDevice = true;
  showSolenoids = false;
  showAlarms = false;

  constructor (private service: IrrigationControllerService,
               private route: ActivatedRoute,
               private router: Router,
               public toastr: ToastsManager,
               vcr: ViewContainerRef,
               private nav: NavService ) {
                this.toastr.setRootViewContainerRef(vcr);
                }

  ngOnInit() {
    // extract route params
    this.route.params.subscribe((params: Params) => {
      this.deviceid = params['deviceid'];
      if (Number.isNaN(this.deviceid)) {
        alert('Missing Device ID');
      }
      // this.getDevice(this.deviceid);
      this.getData();
      const timer = Observable.timer(0, 5000);
      timer
        .takeUntil(this.router.events)
        .subscribe(t => {
          this.onTick(t);
        });
    });
    // extract query params
    this.route.queryParams.subscribe((queryparams: Params) => {
      const view = queryparams['view'];
      if (view != null) {
        console.log(`activeView: ${view}`);
        this.activeView = view;
      }
    });
  }
  getDevice(id: number) {
    console.log('ConfigComponent.getDevice()');
    this.service
      .getDevice(id)
      .subscribe((d: IDevice) => {
            console.log(d);
            this.device = d;
            this.loaded = true;
            this.getSolenoids();
            this.getAlarms();
            this.getAnalogs();
            this.getSpis();
          },
          error => () => {
            console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  onTick(t) {
    this.getData();
    this.ticks = t;
  }
  getData() {
    console.log('getData()');
    this.getDevice(this.deviceid);
    this.loaded = true;
  }
  getIrrigationPrograms() {
      if (this.device != null) {
        this.service.getIrrigationPrograms(this.device.id)
        .subscribe((data: IIrrigationProgram[]) => {
            this.irrigationPrograms = data;
        });
      }
  }
  getSolenoids() {
    if (this.device != null) {
      this.service.getSolenoids(this.device.id)
      .subscribe((data: ISolenoid[]) => {
          this.solenoids = data;
          this.solenoidsLoaded = true;
          console.log(data);
      });
    }
  }
  getAlarms() {
    if (this.device != null) {
      this.service.getAlarms(this.device.id)
      .subscribe((data: IAlarm[]) => {
          this.alarms = data;
          this.alarmsLoaded = true;
          console.log(data);
      });
    }
  }
  getAnalogs() {
    if (this.device != null) {
      this.service.getAnalogs(this.device.id)
      .subscribe((data: IAnalog[]) => {
          this.analogs = data;
          this.analogsLoaded = true;
          console.log(data);
      });
    }
  }
  getSpis() {
    if (this.device != null) {
      this.service.getSpis(this.device.id)
      .subscribe((data: ISpi[]) => {
          this.spis = data;
          this.spisLoaded = true;
          console.log(data);
      });
    }
  }
  getLastUpdated() {
    if (this.device != null) {
      return moment(this.device.updatedAt).format('Do MMM YYYY h:mm:ss a');
    }
    return '';
  }
  timeFormat(date) {
    return moment(date).format('h:mm:ss a');
  }
  dateTimeFormat(date) {
      if (moment(date).isValid()) {
        return moment(date).format('Do MMM YYYY h:mm:ss a');
      }
      return '';
  }
  editSolenoid(s: ISolenoid) {
    this.nav.NavTo(`/device/${this.device.id}/solenoid/${s.id}`);
  }
  editAlarm(a: IAlarm) {
    this.nav.NavTo(`/device/${this.device.id}/alarm/${a.id}`);
  }
  editAnalog(a: IAnalog) {
    this.nav.NavTo(`/device/${this.device.id}/analog/${a.id}`);
  }
  editSPI(s: ISpi) {
    this.nav.NavTo(`/device/${this.device.id}/spi/${s.id}`);
  }
  newSolenoid() {
    this.nav.NavTo(`/device/${this.device.id}/solenoid/new`);
  }
  newAlarm() {
    this.nav.NavTo(`/device/${this.device.id}/alarm/new`);
  }
  newAnalog() {
    this.nav.NavTo(`/device/${this.device.id}/analog/new`);
  }
  newSPI() {
    this.nav.NavTo(`/device/${this.device.id}/spi/new`);
  }
  deviceClicked() {
    this.activeView = 'Device';
    this.showDevice = true;
    this.showSolenoids = false;
    this.showAlarms = false;
  }
  solenoidsClicked() {
    this.activeView = 'Solenoids';
    this.showDevice = false;
    this.showSolenoids = true;
    this.showAlarms = false;
  }
  alarmsClicked() {
    this.activeView = 'Alarms';
  }
  analogsClicked() {
    this.activeView = 'Analogs';
  }
  spisClicked() {
    this.activeView = 'SPIs';
  }
  getActiveClass(v) {
    if (this.activeView === v) {
      return 'active';
    }
    return;
  }
  isView(v) {
    return (this.activeView === v);
  }

  getDeviceName() {
    if (this.device != null) {
      return this.device.Name;
    }
  }
  backClick() {
    this.nav.Back();
  }
  sendCommand(cmd: ICommand) {
    this.service.sendCommand(cmd)
    .subscribe(() => {},
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...', 'Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('Command sent' );
    });
  }
  refreshConfig() {
    const cmd = new ICommand(
      0,  // id
     'LoadConfig',  // commandType
     '', // params
     new Date, // issued
     null, // actioned
     this.deviceid, // deviceId
     new Date, // createdAt
     null  // updatedAt
   );
   this.sendCommand(cmd);
  }
}
