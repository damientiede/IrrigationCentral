import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { IAnalog } from '../model/analog';
import { NavService } from '../services/nav.service';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-analog',
  templateUrl: './analog.component.html',
  styleUrls: ['./analog.component.css']
})
export class AnalogComponent implements OnInit {
  id= 0;
  deviceid = 0;
  loaded = false;
  analog: IAnalog;
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

      // parse analog id
      const id = params['id'];
      if (id === 'new') {
        this.analog = new IAnalog(-1, '', '', '', '' , 0 , 0, '', 0, this.deviceid);
        this.loaded = true;
      } else if (Number.isNaN(id)) {
          alert(`Invalid Analog ID ${id}`);
      } else {
        this.id = id;
        this.getAnalog(this.id);
      }
    });
  }
  getAnalog(id: number) {
    this.service
      .getAnalog(id)
      .subscribe((a: IAnalog) => {
            this.analog = a;
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
    if (this.analog == null) { return; }
    if (this.analog.id === -1) {
      return 'New analog';
    }
    return `Edit analog - ${this.analog.id}`;
  }
  save() {
    console.log(this.analog);
    if (this.analog.id === -1) {
      this.service.createAnalog(this.analog)
      .subscribe((s: IAnalog) => {
        console.log(s);
        this.analog = s;
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
    this.service.saveAnalog(this.analog)
      .subscribe(() => {},
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
    console.log(`Deleting analog ${this.analog.Name}`);
    this.service.deleteAnalog(this.analog)
    .subscribe(() => {},
    error => () => {
      console.log('Something went wrong...');
      this.toastr.error('Something went wrong...','Damn');
    },
    () => {
      console.log('Success');
      this.toastr.success('Changes saved' );
  });
}}
