import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, UrlSegment } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  url: UrlSegment[];
  currentRoute: string;
  routeSegments: string[];
  loaded = false;
  deviceId: any;
  constructor(private router: Router,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e) => {
      this.currentRoute = (e as NavigationEnd).urlAfterRedirects;
      this.parseRoute(this.currentRoute);
      this.loaded = true;
    });

    $(document).ready(function () {
      $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
      });
    });
  }
  parseRoute(currentRoute: string) {
    console.log(this.currentRoute);
    this.routeSegments = this.currentRoute.split('/');
    for (let s of this.routeSegments) {
      console.log(s);
    }
    if (this.routeSegments.length > 2) {
      this.deviceId = this.routeSegments[2];
    }
  }
  getActiveClass(item) {
    if ((item === 'status' ||
        item === 'schedules' ||
        item === 'history' ||
        item === 'settings')
       && (this.deviceId === undefined)) {
      return 'hidden';
    }
    if (this.loaded) {
      if (this.currentRoute.indexOf(item) > -1) {
        return 'active';
      }
    }
  }
  dismissMenu() {
    // hide sidebar
    $('#sidebar').removeClass('active');
    // hide overlay
    $('.overlay').removeClass('active');
  }
  // navigation
  config() {
    this.dismissMenu();
    this.router.navigate([`/device/${this.deviceId}/config`]);
  }
  history() {
    this.dismissMenu();
    this.router.navigate([`/device/${this.deviceId}/history`]);
  }
  schedules() {
    this.dismissMenu();
    this.router.navigate([`/device/${this.deviceId}/schedules`]);
  }
  status() {
    this.dismissMenu();
    this.router.navigate([`/device/${this.deviceId}/status`]);
  }
  devices() {
    this.dismissMenu();
    this.router.navigate([`/devices`]);
  }
  home() {
    this.dismissMenu();
    this.router.navigate([`/home`]);
  }
}
