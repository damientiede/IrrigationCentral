import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { IAlarm } from '../model/alarm';
import { NavService } from '../services/nav.service';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  id= 0;
  deviceid = 0;
  loaded = false;
  alarm: IAlarm;
  hardwareTypes: string[] = ['GPIO', 'Distributed', 'SPI'];
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

      // parse alarm id
      const id = params['id'];
      if (id === 'new') {
        this.alarm = new IAlarm(-1, '', '', '', '' , 0 , this.deviceid);
        this.loaded = true;
      } else if (Number.isNaN(id)) {
          alert(`Invalid Alarm ID ${id}`);
      } else {
        this.id = id;
        this.getAlarm(this.id);
      }
    });
  }
  getAlarm(id: number) {
    this.service
      .getAlarm(id)
      .subscribe((a: IAlarm) => {
            console.log(a);
            this.alarm = a;
            this.loaded = true;
          },
          error => () => {
            console.log('Something went wrong...');
          },
          () => {
              console.log('Success');
          });
  }
  getTitle() {
    if (this.alarm == null) { return; }
    if (this.alarm.id === -1) {
      return 'New alarm';
    }
    return `Edit alarm - ${this.alarm.id}`;
  }
  save() {
    console.log(this.alarm);
    if (this.alarm.id === -1) {
      this.service.createAlarm(this.alarm)
      .subscribe((s: IAlarm) => {
        console.log(s);
        this.alarm = s;
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
    this.service.saveAlarm(this.alarm)
      .subscribe(() => {
        console.log(`Saving alarm`);
        console.log(this.alarm);
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
  back() {
    this.nav.NavTo(`/device/${this.deviceid}/config`);
  }
  cancel() {
    this.nav.NavTo(`/device/${this.deviceid}/config`);
  }
  delete() {
    console.log(`Deleting alarm ${this.alarm.Name}`);
    this.service.deleteAlarm(this.alarm)
    .subscribe(() => {},
    error => () => {
      console.log('Something went wrong...');
      this.toastr.error('Something went wrong...','Damn');
    },
    () => {
      console.log('Success');
      this.toastr.success('Changes saved' );
  });
  this.nav.NavTo(`/device/${this.deviceid}/config`);
}}
