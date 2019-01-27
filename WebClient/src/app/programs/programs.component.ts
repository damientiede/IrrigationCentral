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
    this.service.getPrograms(this.deviceId)
                .subscribe((programs: IProgram[]) => {
                  this.programs = programs;
                  console.log(programs);
                  this.loaded = true;
                });
  }
  back() {
    this.router.navigate([`/device/${this.deviceId}/status`]);
  }
  getStatusClass(p: IProgram) {
    if (p == null) {return; }
    if (p.CurrentStep !== null) {
      return 'alert alert-success col-sm-12';
    }
    if (p.Enabled === false) {
      return 'alert alert-secondary col-sm-12';
    }
    if (p.Finished) {
      return 'alert alert-secondary col-sm-12';
    }
    return 'alert alert-primary col-sm-12';
  }
  getStatusText(p: IProgram) {
    if (p == null) {return 'Unknown program'; }
    if (p.CurrentStep != null) {
      return `${p.Name} - Step${p.CurrentStep} in progress...`;
    }
    if (p.Finished) {
      return `${p.Name} - finished.`;
    }
    const start = moment.parseZone(p.Start).format('DD MMM YYYY h:mm a'); // moment(p.Start).format('DD MMM YYYY HH:mm');
    return `${p.Name} - starts at ${start}`;
  }
  programClick(program: IProgram) {
    this.router.navigate([`/device/${this.deviceId}/programs/${program.id}`]);
  }
  newProgram() {
    this.router.navigate([`/device/${this.deviceId}/programs/new`]);
  }
}
