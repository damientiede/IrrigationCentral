import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { ISolenoid } from '../model/solenoid';
import { NavService } from '../services/nav.service';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-solenoid',
  templateUrl: './solenoid.component.html',
  styleUrls: ['./solenoid.component.css']
})
export class SolenoidComponent implements OnInit {
  id= 0;
  deviceid = 0;
  loaded = false;
  solenoid: ISolenoid;
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

      // parse solenoid id
      const id = params['id'];
      if (id === 'new') {
        this.solenoid = new ISolenoid(-1, '', '', '', '' , 0, false, this.deviceid);
        this.loaded = true;
      } else if (Number.isNaN(id)) {
          alert(`Invalid Solenoid ID ${id}`);
      } else {
        this.id = id;
        this.getSolenoid(this.id);
        // this.loaded = true;
      }
    });
  }
  getSolenoid(id: number) {
    console.log('getSolenoid()');
    this.service
      .getSolenoid(id)
      .subscribe((d: ISolenoid) => {
            console.log(d);
            this.solenoid = d;
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
    if (this.solenoid == null) { return; }
    if (this.solenoid.id === -1) {
      return 'New solenoid';
    }
    return `Edit solenoid - ${this.solenoid.id}`;
  }
  save() {
    console.log(this.solenoid);
    if (this.solenoid.id === -1) {
      this.service.createSolenoid(this.solenoid)
      .subscribe((s: ISolenoid) => {
        console.log(s);
        this.solenoid = s;
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
    this.service.saveSolenoid(this.solenoid)
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
    console.log(`Deleting solenoid ${this.solenoid.Name}`);
    this.service.deleteSolenoid(this.solenoid)
    .subscribe(() => {},
    error => () => {
      console.log('Something went wrong...');
      this.toastr.error('Something went wrong...', 'Damn');
    },
    () => {
      console.log('Success');
      // this.toastr.success('Changes saved' );
    });
    this.nav.NavTo(`/device/${this.deviceid}/config`);
}}
