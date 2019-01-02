import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public firstName: string; // = 'Damien';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.scheduleRenewal();
  }
  sidebarClick() {
    console.log('sidebarCollapse clicked');
    // open sidebar
    $('#sidebar').addClass('active');
    // fade in the overlay
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }
}
