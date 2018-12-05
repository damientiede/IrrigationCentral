import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(private nav: NavService ) {}

  home() {
    this.nav.Home();
  }
}
