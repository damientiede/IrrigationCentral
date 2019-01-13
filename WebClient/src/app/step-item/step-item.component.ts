import { Component, Input, OnInit } from '@angular/core';
import { IStep } from '../model/step';

@Component({
  selector: 'app-step-item',
  templateUrl: './step-item.component.html',
  styleUrls: ['./step-item.component.css']
})
export class StepItemComponent implements OnInit {
  @Input() Step: IStep;
  constructor() { }

  ngOnInit() {
  }

  getText() {
    if (this.Step.IrrigationAction !== null) {
      if (this.Step.IrrigationAction.Finished !== null) {
        return `${this.Step.SolenoidName} for ${this.Step.Duration} minutes - finished`;
      }
      return `${this.Step.SolenoidName} for ${this.Step.Duration} minutes - in progress`;
    }
    return `${this.Step.SolenoidName} for ${this.Step.Duration} minutes`;
  }
  getStatusClass() {
    if (this.Step.IrrigationAction !== null) {
      if (this.Step.IrrigationAction.Finished !== null) {
        return 'alert alert-secondary col-sm-12';
      }
      return 'alert alert-success col-sm-12';
    }
    return 'alert alert-primary col-sm-12';
  }
}
