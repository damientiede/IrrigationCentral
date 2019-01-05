import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController1.service';
import { IDevice } from '../model/device';
import { IProgram } from '../model/program';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  deviceId: any;
  programs: IProgram[];
  loaded = false;

  constructor(private service: IrrigationControllerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // extract route params
    this.route.params.subscribe((params: Params) => {
      this.deviceId = params['deviceid'];
      if (Number.isNaN(this.deviceId)) {
        alert('Missing Device ID');
      }
      // this.getDevice(this.deviceid);
      this.getData();
    });
  }

  getData() {
    const instant = new Date();
    this.programs = [new IProgram(1, 'Program 1', instant, null, true, 1, null, instant, instant),
                     new IProgram(1, 'Program 2', instant, null, true, 1, null, instant, instant),
                     new IProgram(1, 'Program 3', instant, null, true, 1, null, instant, instant)];
    this.loaded = true;
  }

  getStatusClass(p: IProgram) {
    if (p == null) {return; }
    /*
    const duration = this.lastSeenDuration(d);
    if (duration.as('seconds') > (30000)) {
      return 'alert alert-danger col-sm-12';
    }
    if (d.State.indexOf('Irrigating') > -1) { return 'alert alert-success col-sm-12'; }
    if (d.State.indexOf('Fault') > -1) { return 'alert alert-danger col-sm-12'; } */
    return 'alert alert-secondary col-sm-12';
  }
  getStatusText(p: IProgram) {
    if (p == null) {return 'Unknown program'; }
    // let status = '';
    /* const duration = this.lastSeenDuration(d);
    if (duration.as('seconds') > (30000)) {
      status =  `Device offline for ${Math.floor(duration.as('minutes'))} minutes`;
    } */
    // status = d.Status;
    return p.Name;
  }
  programClick(program: IProgram) {
    this.router.navigate([`/device/${this.deviceId}/programs/${program.id}`]);
  }
  newProgram() {
    this.router.navigate([`/device/${this.deviceId}/program/new`]);
  }
}
