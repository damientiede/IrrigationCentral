import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { ISpi } from '../model/spi';
import { NavService } from '../services/nav.service';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-spi',
  templateUrl: './spi.component.html',
  styleUrls: ['./spi.component.css']
})
export class SpiComponent implements OnInit {
  id= 0;
  deviceid = 0;
  loaded = false;
  spi: ISpi;
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

      // parse spi id
      const id = params['id'];
      if (id === 'new') {
        this.spi = new ISpi(-1, '', 0, 0, 0, 0, this.deviceid);
        this.loaded = true;
      } else if (Number.isNaN(id)) {
          alert(`Invalid Analog ID ${id}`);
      } else {
        this.id = id;
        this.getSpi(this.id);
      }
    });
  }
  getSpi(id: number) {
    this.service
      .getSpi(id)
      .subscribe((a: ISpi) => {
            this.spi = a;
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
    if (this.spi == null) { return; }
    if (this.spi.id === -1) {
      return 'New spi';
    }
    return `Edit spi - ${this.spi.id}`;
  }
  save() {
    console.log(this.spi);
    if (this.spi.id === -1) {
      this.service.createSpi(this.spi)
      .subscribe((s: ISpi) => {
        console.log(s);
        this.spi = s;
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
    this.service.saveSpi(this.spi)
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
    console.log(`Deleting spi ${this.spi.Name}`);
    this.service.deleteSpi(this.spi)
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
