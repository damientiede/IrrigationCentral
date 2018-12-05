import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import { IDevice } from '../model/device';
import * as moment from 'moment';
import { NavService } from '../services/nav.service';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  userid: Number;
  devices: IDevice[];
  loaded = false;
  ticks = 0;
  constructor(private dataService: IrrigationControllerService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef,
              private router: Router,
              private nav: NavService,
              private route: ActivatedRoute) {
        this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.getData();
    const timer = Observable.timer(0, 5000);
    timer
      .takeUntil(this.router.events)
      .subscribe(t => {
        this.onTick(t);
      });
  }

  onTick(t) {
    this.getData();
    this.ticks = t;
  }
  getData() {
    this.dataService.getDevices(this.userid)
      .subscribe((data: IDevice[]) => {
          this.devices = data;
          this.loaded = true;
          console.log(data);
      });
  }
  lastSeenDuration(d: IDevice) {
    if (d == null) {return; }
    const now = moment.utc();
    const ls = moment.utc(d.updatedAt);
    return moment.duration(now.diff(ls));
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
  getStatusImg(d: IDevice) {
    const now = moment.utc();
    const dup = moment.utc(d.updatedAt);
    if (now.diff(dup) > (5 * 60000)) {
      return `../../assets/redled.png`;
    }
    return '../../assets/greenled.png';
  }

  navToDevice(d: IDevice) {
    console.log(d);
    const url = `/device/${d.id}/status`;
    console.log(url);
    this.nav.NavTo(url);
  }
}
