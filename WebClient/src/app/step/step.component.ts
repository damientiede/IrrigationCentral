import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
import { IrrigationControllerService} from '../services/IrrigationController1.service';
import { ISolenoid } from '../model/solenoid';
import { IProgram } from '../model/program';
import { IStep } from '../model/step';
import { ICommand } from '../model/command';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IDevice } from '../model/device';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  deviceId: number;
  device: IDevice;
  programId: number;
  newSequence = 1;
  stepId: any;
  step: IStep;
  solenoids: ISolenoid[];
  stepSolenoid: ISolenoid;
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
      this.programId = params['programid'];
      if (Number.isNaN(this.programId)) {
        alert('Missing Program ID');
      }
      this.newSequence = params['sequence'];
      if (Number.isNaN(this.newSequence)) {
        alert('Missing newSequence ID');
      }
      // parse step id
      this.stepId = params['id'];
      if (this.stepId === 'new') {
      }
      this.GetData();
    });
  }

  GetData() {
    this.service.getDevice(this.deviceId).subscribe((d: IDevice) => {
      this.device = d;
      this.service.getSolenoids(this.deviceId).subscribe((solenoids: ISolenoid[]) => {
        this.solenoids = [];
        for (let s of solenoids) {
          if (s.id !== this.device.PumpSolenoidId) {
            this.solenoids.push(s);
          }
        }
        if (this.stepId === 'new') {
          this.step = new IStep(-1, this.newSequence, 60, 1, 'solenoidName', true, 1, 0, null, new Date(), new Date());
          this.loaded = true;
        } else {
          this.service.getStep(this.stepId).subscribe((step: IStep) => {
              this.step = step;
              this.newSequence = step.Sequence;
              for (let s of this.solenoids) {
                if (s.id === this.step.SolenoidId) {
                  this.stepSolenoid = s;
                  break;
                }
              }
              this.loaded = true;
          });
        }
      });
    });
  }

  back() {
    this.router.navigate([`device/${this.deviceId}/programs/${this.programId}`]);
  }
  delete() {
    this.service.deleteStep(this.step)
    .subscribe(() => {
      this.loadProgram();
    },
    error => () => {
      console.log('Something went wrong...');
      this.toastr.error('Something went wrong...', 'Damn');
    },
    () => {
      console.log('Success');
      // this.toastr.success('Changes saved' );
    });
    // this.router.navigate([`/device/${this.deviceId}/programs/${this.programId}`]);
  }
  save() {
      this.step.Sequence = this.newSequence;
      this.step.SolenoidId = this.stepSolenoid.id;
      this.step.SolenoidName = this.stepSolenoid.Name;
      this.step.RequiresPump = this.stepSolenoid.RequiresPump;
      console.log(this.step);
      if (this.step.id === -1) {
        this.step.ProgramId = this.programId;
        this.service.createStep(this.step)
        .subscribe((s: IStep) => {
          console.log(s);
          this.step = s;
          for (let s of this.solenoids) {
            if (s.id === this.step.SolenoidId) {
              this.stepSolenoid = s;
              break;
            }
          }
          this.loadProgram();
        },
        error => () => {
          console.log('Something went wrong...');
          this.toastr.error('Something went wrong...', 'Damn');
        },
        () => {
          console.log('Success');
          //this.toastr.success('Changes saved' );
          this.loadProgram();
        });
        return;
      }
      this.service.saveStep(this.step)
        .subscribe((s: IStep) => {
          console.log('subscribe()');
          this.loadProgram();
        },
        error => () => {
          console.log('Something went wrong...');
          this.toastr.error('Something went wrong...', 'Damn');
        },
        () => {
          console.log('Success');
          this.loadProgram();
          //this.toastr.success('Changes saved' );
      });
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
        console.log('command sent');
        this.router.navigate([`/device/${this.deviceId}/programs/${this.programId}`]);
        // this.toastr.success('Command sent' );
    });
  }
}
