import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { IDevice } from '../model/device';
import { StatusWidgetComponent } from '../status-widget/status-widget.component';
@Component({
  selector: 'app-device-menu',
  templateUrl: './device-menu.component.html',
  styleUrls: ['./device-menu.component.css']
})
export class DeviceMenuComponent implements OnInit {
  @Input() Device: IDevice;
  url: UrlSegment[];
  // device: IDevice;
  view = 'status';
  constructor(private router: Router,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.url = url;
    });
  }
  lastSeen() {
    if (this.Device != null) {
      return this.Device.updatedAt;
    }
    return null;
  }
  // navigation
  config() {
    this.router.navigate([`/device/${this.Device.id}/config`]);
  }
  history() {
    this.router.navigate([`/device/${this.Device.id}/history`]);
  }
  schedules() {
    this.router.navigate([`/device/${this.Device.id}/schedules`]);
  }
  status() {
    this.router.navigate([`/device/${this.Device.id}/status`]);
  }
  getActiveClass(v) {
    if (this.route.toString().indexOf(v) > 0) {
      return 'btn-primary';
    }
    return 'btn-secondary';
  }
}
