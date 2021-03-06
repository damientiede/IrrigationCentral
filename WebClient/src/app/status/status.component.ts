import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UiSwitchModule } from 'ngx-ui-switch';
import { IrrigationControllerService} from '../services/IrrigationController1.service';
import { IStatus} from '../model/status';
import { IDevice } from '../model/device';
import { ISolenoid } from '../model/solenoid';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { IIrrigationAction } from '../model/irrigationaction';
import { DeviceMenuComponent } from '../device-menu/device-menu.component';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  deviceid = -1;
  ticks = 0;
  status: IStatus;
  device: IDevice;
  solenoids: ISolenoid[];
  irrigationAction: IIrrigationAction;
  manualStation: number;
  manualDuration = 5;
  loaded = false;
  irrigating = false;
  isAutoMode = false;
  delayRefreshUntil: any;
  delayRefreshUI = 7;

  dateFormat= 'YYYY-MM-DD HH:mm:ss';
  constructor(private dataService: IrrigationControllerService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef,
              private router: Router,
              private route: ActivatedRoute) {
                this.toastr.setRootViewContainerRef(vcr);
               }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.deviceid = params['deviceid'];
        if (Number.isNaN(this.deviceid)) {
          alert('Missing Device ID');
        }
        this.dataService
          .getDevice(this.deviceid)
          .subscribe((d: IDevice) => {
            console.log(d);
            this.device = d;
            this.getSolenoids(this.device);
          });
        const timer = Observable.timer(0, 5000);
        timer
          .takeUntil(this.router.events)
          .subscribe(t => {
            this.onTick(t);
          });
      });
  }
  onTick(t) {
    if (this.delayRefreshUntil) {
      if (moment.utc() < this.delayRefreshUntil) {
        return;
      }
    }
    this.getData(this.deviceid);
    this.ticks = t;
  }

  getData(id: number) {
    this.getDevice(id);
    // this.getCurrentAction(id);
  }
  getDevice(id: number) {
    console.log('StatusComponent.getDevice()');
    this.dataService
      .getDevice(id)
      .subscribe((d: IDevice) => {
            if (this.delayRefreshUntil) {
              if (moment.utc() < this.delayRefreshUntil) {
                return;
              }
            }
            console.log(d);
            this.device = d;
            this.isAutoMode = (d.Mode === 'Auto');
            this.loaded = true;
          },
          error => () => {
            console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  getSolenoids(d: IDevice) {
    console.log('getSolenoids()');
    this.dataService
      .getSolenoids(d.id)
      .subscribe((solenoids: ISolenoid[]) => {
            this.solenoids = solenoids;
            console.log(this.solenoids);
            for (const s of this.solenoids) {
              // remove the pump from the list of available solenoids
              if (s.id === d.PumpSolenoidId) {
                const index = solenoids.indexOf(s, 0);
                if (index > -1) {
                  this.solenoids.splice(index, 1);
                }
              }
            }
            if (this.solenoids.length > 0) {
              this.manualStation = this.solenoids[0].id;
            }
            this.loaded = true;
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
  percentComplete() {
    if (this.device.IrrigationAction == null) { return 0; }
    // return this.device.IrrigationAction.Progress;
     if (this.device.IrrigationAction.Finished != null) { return 100; }
    const now = moment.utc();
    const start = moment.utc(this.device.IrrigationAction.Start);
    const fin = moment.utc(this.device.IrrigationAction.Start);
    fin.add(this.device.IrrigationAction.Duration, 'minutes');
    const elapsed = now.diff(start);
    const duration = this.device.IrrigationAction.Duration * 60 * 1000;
    const progress = Math.ceil(elapsed / duration * 100);
    if (progress > 100) { return 100; }
    return progress;
  }
  isLoaded() {
    return this.loaded;
  }
  /* isAutoMode() {
    if (this.device == null) { return false; }
    if (this.device.Mode === 'Auto') { return true; }
    return false;
  } */
  getDuration() {
    if (this.irrigationAction != null) {
      return this.irrigationAction.Duration;
    }
    return 0;
  }
  lastSeenDuration() {
    if (this.device == null) {return; }
    const now = moment.utc();
    const ls = moment.utc(this.device.updatedAt);
    return moment.duration(now.diff(ls));
  }
  getStatusClass() {
    if (this.device == null) {return; }
    const duration = this.lastSeenDuration();
    if (duration.as('seconds') > (30000)) {
      return 'alert alert-danger';
    }
    if (this.device.State.indexOf('Irrigating') > -1) { return 'alert alert-success'; }
    if (this.device.State.indexOf('Fault') > -1) { return 'alert alert-danger'; }
    if (this.device.State.indexOf('Paused') > -1) { return 'alert alert-warning'; }

    if (this.device.Mode.indexOf('Manual') > -1) { return 'alert alert-secondary'; }
    return 'alert alert-primary';
  }
  showStartButton() {
    if (this.device == null) {return false; }
    if (this.device.IrrigationAction == null) { return true; }
    return false;
  }
  isIrrigating() {
    if (this.device == null) {return false; }
    if (this.device.IrrigationAction == null) { return false; }
    if ((this.device.IrrigationAction.Finished == null) &&
       (this.device.IrrigationAction.Paused == null)) { return true; }
    return false;
  }
  isPaused() {
    if (this.device == null) {return false; }
    if (this.device.IrrigationAction == null) { return false; }
    if (this.device.IrrigationAction.Paused == null) { return false; }
    return true;
  }
  getStatusText() {
    if (this.device == null) {return 'Unknown device'; }
    const duration = this.lastSeenDuration();
    if (duration.as('seconds') > (30000)) {
      return `Device offline for ${Math.floor(duration.as('minutes'))} minutes`;
    }
    return this.device.Status;
  }
  formatDateShort(date) {
    return moment(date).format('dd/MM/yyyy');  // .format('DD MMM YYYY h:mm a');   //.format('dd/MM/yyyy');
  }
  getState() {
    if (this.status != null) {
      return this.status.state;
    }
    return '';
  }
  getManAutoClass(v) {
    if (this.device.Mode === v) {
      return 'btn btn-warning active';
    }
    return 'btn btn-secondary';
  }
  getToggleBtnClass() {
    if (this.device == null) {
      return 'btn btn-lg';
    }
    if (this.device.Mode === 'Auto') {
      return 'btn btn-info';
    }
    if (this.device.Mode === 'Manual') {
      return 'btn btn-warning';
    }
    return 'btn btn-lg';
  }
  getToggleBtnText() {
    if (this.device == null) {
      return '';
    }
    if (this.device.Mode === 'Auto') {
      return 'Switch to Manual';
    }
    if (this.device.Mode === 'Manual') {
      return 'Switch to Auto';
    }
    return '';
  }
  setMode(mode) {
    if (this.device.Mode === mode) {
      return;
    }
    this.device.Mode = mode;
    this.device.Status = `Switching to ${mode}  mode...`;
    this.toggleMode();
  }
  toggleMode() {
    if (this.device == null) {
      return '';
    }
    if (this.isAutoMode) {
      this.setModeCommand('Manual');
    } else {
      this.setModeCommand('Auto');
    }
  }
  getStartTime() {
    if (this.irrigationAction != null) {
      return moment(this.irrigationAction.Start).format('DD MMM YYYY HH:mm');
    }
    return '';
  }
  getEnd() {
    if (this.irrigationAction != null) {
      return moment(this.irrigationAction.Start).add(this.irrigationAction.Duration, 'minutes').format('DD MMM YYYY HH:mm');
    }
    return '';
  }
  getDeviceTitle() {
    if (this.device != null) {
      return this.device.Name;
    }
  }
  getPressure() {
    if (this.device != null) {
      // return '?? kPa';
      return `${this.device.Pressure} kPa`;
    }
    return '';
  }
  getLastUpdated() {
    if (this.device != null) {
      return moment(this.device.updatedAt).format('DD MMM YYYY h:mm a'); // .format('DD MMM YYYY HH:mm');
    }
    return '';
  }
  getSolenoidNameById(n) {
    if (this.solenoids != null) {
      this.solenoids.forEach((sol) => {
        if (`${sol.id}` === n) {
          return sol.Name;
        }
      });
    }
  }
  manualStop() {
    const cmd = new ICommand(
      0,  // id
      'Stop',  // commandtype
      '', // params
      new Date, // issued
      null, // actioned
      this.deviceid, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.sendCommand(cmd);
    this.delayRefreshUntil = moment.utc().add(this.delayRefreshUI, 'seconds');
    this.device.IrrigationAction = null;
    this.device.State = 'Standby';
    this.device.Status = `Stopping irrigation...`;
  }
  manualStart() {
    let params = null;
    if (this.manualStation == null || this.manualDuration == null) {
      this.device.Status = 'Please select a station to run';
      return;
    }
    params = `${this.manualStation}, ${this.manualDuration}`;
    const cmd = new ICommand(
        0,  // id
      'Manual',  // commandType
      params,   // params
      new Date, // issued
      null, // actioned
      this.deviceid, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.sendCommand(cmd);
    this.delayRefreshUntil = moment.utc().add(this.delayRefreshUI, 'seconds');
    // const solName = this.getSolenoidNameById(this.manualStation);
    this.device.State = 'Irrigating';
    this.device.Status = 'Starting irrigation...';
    // this.device.Status = `Starting station ${solName} for ${this.manualDuration} minutes...`;
  }
  pause() {
    const cmd = new ICommand(
      0,  // id
      'Pause',  // commandType
      null,   // params
      new Date, // issued
      null, // actioned
      this.deviceid, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.sendCommand(cmd);
    this.delayRefreshUntil = moment.utc().add(this.delayRefreshUI, 'seconds');
    this.device.State = 'Paused';
    this.device.Status = `Pausing irrigation action...`;
    this.device.IrrigationAction.Paused = new Date;
  }
  resume() {
    const cmd = new ICommand(
      0,  // id
      'Resume',  // commandType
      null,   // params
      new Date, // issued
      null, // actioned
      this.deviceid, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.sendCommand(cmd);
    this.delayRefreshUntil = moment.utc().add(this.delayRefreshUI, 'seconds');
    this.device.State = `Irrigating`;
    this.device.Status = `Resuming irrigation action...`;
    this.device.IrrigationAction.Paused = null;
  }
  setModeCommand(mode) {
    const cmd = new ICommand(
        0,  // id
      mode,  // commandType
      null, // params
      new Date, // issued
      null, // actioned
      this.deviceid, // deviceId
      new Date, // createdAt
      null  // updatedAt
    );
    this.sendCommand(cmd);
    this.delayRefreshUntil = moment.utc().add(this.delayRefreshUI, 'seconds');
  }
  sendCommand(cmd: ICommand) {
    this.dataService.sendCommand(cmd)
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
  config() {
    this.router.navigate([`/device/${this.device.id}/config`]);
  }
}
