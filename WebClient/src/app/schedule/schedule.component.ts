import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import * as moment from 'moment';
import { ISchedule } from '../model/schedule';
import { ISolenoid } from '../model/solenoid';
import { ICommand } from '../model/command';
import { NavService } from '../services/nav.service';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  id= 0;
  deviceid = 0;
  loaded = false;
  schedule: ISchedule;
  solenoids: ISolenoid[];
  solenoid: ISolenoid;
  startDate: string;
  constructor(private service: IrrigationControllerService,
              private route: ActivatedRoute,
              private nav: NavService,
              vcr: ViewContainerRef,
              public toastr: ToastsManager) {
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      // parse device id
      this.deviceid = params['deviceid'];
      console.log(params);
      if (Number.isNaN(this.deviceid)) {
        alert('Missing Device ID');
      }
      this.getSolenoids(this.deviceid);
      // parse schedule id
      const id = params['id'];
      if (id === 'new') {
        this.startDate = moment().toISOString().slice(0, 16);
        this.schedule = new ISchedule(-1, '', null, 0, 0, 0, '', false, false, 0, this.deviceid);
        this.loaded = true;
      } else if (Number.isNaN(id)) {
          alert(`Invalid Schedule ID ${id}`);
      } else {
        this.id = id;
        this.getSchedule(this.id);
        // this.loaded = true;
      }
    });
  }
  getSchedule(id: number) {
    console.log('getSchedule()');
    this.service
      .getSchedule(id)
      .subscribe((d: ISchedule) => {
            console.log(d);
            this.schedule = d;
            const sd = moment(this.schedule.StartDate);
            this.startDate = sd.toISOString().slice(0, 16);
            this.loaded = true;
          },
          error => () => {
            console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  getSolenoids(id: number) {
    console.log('getSolenoids()');
    this.service
      .getSolenoids(id)
      .subscribe((s: ISolenoid[]) => {
            this.solenoids = s;
            // this.loaded = true;
          },
          error => () => {
              console.log('Something went wrong...');
              // this._toasterService.pop('error', 'Damn', 'Something went wrong...');
          },
          () => {
              console.log('Success');
              // this._toasterService.pop('success', 'Complete', 'Getting all values complete');
              // this._slimLoadingBarService.complete();
          });
  }
  solenoidSelected(id) {
    if (this.schedule != null) {
      console.log(`${id} ${this.schedule.SolenoidId}`);
      return (id === this.schedule.SolenoidId);
    }
    return false;
  }
  onSolenoidChange(id) {
    // console.log(JSON.stringify(e));
    this.schedule.SolenoidId = id;
  }
  getTitle() {
    if (this.schedule == null) { return; }
    if (this.schedule.id === -1) {
      return 'New schedule';
    }
    return `Edit schedule - ${this.schedule.id}`;
  }
  save() {
    this.schedule.StartDate = moment.utc(this.startDate).toDate();
    console.log(this.schedule);
    if (this.schedule.id === -1) {
      this.service.createSchedule(this.schedule)
      .subscribe((s: ISchedule) => {
        console.log(s);
        this.schedule = s;
        // this.startDate = moment(s.StartDate).format(); // .toISOString().slice(0, 16);
        this.loadSchedules();
      },
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...', 'Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('Changes saved' );
      });
      return;
    }
    this.service.saveSchedule(this.schedule)
      .subscribe((s: ISchedule) => {
        this.loadSchedules();
      },
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...', 'Damn');
      },
      () => {
        console.log('Success');
        this.toastr.success('Changes saved' );
    });
  }
  loadSchedules() {
    const cmd = new ICommand(
      0,  // id
      'LoadSchedules',  // commandType
      null, // params
      new Date, // issued
      null, // actioned
      this.deviceid, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.service.sendCommand(cmd)
    .subscribe(() => {},
      error => () => {
        console.log('Something went wrong...');
        this.toastr.error('Something went wrong...', 'Damn');
      },
      () => {
        console.log('Success');
        // this.toastr.success('Command sent' );
    });
  }
  back() {
    this.nav.NavTo(`/device/${this.deviceid}/schedules`);
  }
  cancel() {
    this.nav.NavTo(`/device/${this.deviceid}/schedules`);
  }
  delete() {
    console.log(`Deleting schedule ${this.schedule.Name}`);
    this.service.deleteSchedule(this.schedule)
    .subscribe(() => {},
    error => () => {
      console.log('Something went wrong...');
      this.toastr.error('Something went wrong...', 'Damn');
    },
    () => {
      console.log('Success');
      // this.toastr.success('Changes saved' );
    });
    this.nav.NavTo(`/device/${this.deviceid}/schedules`);
}}
