import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { NavService } from './services/nav.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public firstName = 'Damien';

  constructor(private nav: NavService ) {}

  home() {
    this.nav.Home();
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
