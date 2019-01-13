import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController1.service';
import { IDevice } from '../model/device';
import { IProgram } from '../model/program';
import { IStep } from '../model/step';
import { ICommand } from '../model/command';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StepItemComponent } from '../step-item/step-item.component';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  deviceId: number;
  programId: number;
  program: IProgram;
  startDate: string;
  loaded = false;

  constructor(private service: IrrigationControllerService,
    private route: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    // extract route params
    this.route.params.subscribe((params: Params) => {
      this.deviceId = params['deviceid'];
      if (Number.isNaN(this.deviceId)) {
        alert('Missing Device ID');
      }
      // parse program id
      const id = params['id'];
      if (id === 'new') {
        this.startDate = moment().toISOString().slice(0, 16);
        this.program = new IProgram(-1, 'New program', new Date(), null, null, true, this.deviceId, [], new Date(), new Date());
        this.loaded = true;
      } else if (Number.isNaN(id)) {
          alert(`Invalid Program ID ${id}`);
      } else {
        this.programId = id;
        this.GetData();
      }
    });
  }

  GetData() {
    this.service.getProgram(this.programId)
      .subscribe((program: IProgram) => {
        this.program = program;
        this.startDate = moment(program.Start).toISOString().slice(0, 16);
        this.loaded = true;
        console.log(program);
      });
  }
  getStatusClass(step: IStep) {
    if (step !== null) {
      if (this.program.CurrentStep === step.Sequence) {
        return 'alert alert-success col-sm-12';
      }
    }
    return 'alert alert-secondary col-sm-12';
  }
  back() {
    this.router.navigate([`/device/${this.deviceId}/programs`]);
  }
  delete() {
    this.service.deleteProgram(this.program)
    .subscribe(() => {
      this.deleteProgram();
      this.router.navigate([`/device/${this.deviceId}/programs`]);
    },
    error => () => {
      console.log('Something went wrong...');
      this.toastr.error('Something went wrong...', 'Damn');
    },
    () => {
      console.log('Success');
      // this.toastr.success('Changes saved' );
    });
  }
  save() {
    const start = moment.utc(this.startDate).toDate();

    // reset the program for action
    if (start !== this.program.Start) {
      this.program.Start = start;
      this.program.Finished = null;
      this.program.CurrentStep = null;
      for (let i = 0; i < this.program.Steps.length; i++) {
        const step = this.program.Steps[i];
        step.IrrigationActionId = null;
        step.IrrigationAction = null;
        this.service.saveStep(step).subscribe();
      }
    }

    console.log(this.program);
    if (this.program.id === -1) {
      this.service.createProgram(this.program)
      .subscribe((p: IProgram) => {
        console.log(p);
        this.program = p;
        // this.startDate = moment(s.StartDate).format(); // .toISOString().slice(0, 16);
        this.loadProgram();
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
    this.service.saveProgram(this.program)
      .subscribe((s: IProgram) => {
        this.loadProgram();
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
  newStep() {
    this.router.navigate([`device/${this.deviceId}/programs/${this.program.id}/steps/new`]);
  }
  stepClick(step: IStep) {
    this.router.navigate([`device/${this.deviceId}/programs/${this.program.id}/steps/${step.id}`]);
  }
  loadProgram() {
    const cmd = new ICommand(
      0,  // id
      'LoadProgram',  // commandType
      `${this.programId}`, // params
      new Date, // issued
      null, // actioned
      this.deviceId, // deviceId
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
  deleteProgram() {
    const cmd = new ICommand(
      0,  // id
      'DeleteProgram',  // commandType
      `${this.programId}`, // params
      new Date, // issued
      null, // actioned
      this.deviceId, // deviceId
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
}
