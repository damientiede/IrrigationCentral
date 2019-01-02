import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CallbackComponent } from '../callback/callback.component';
import { IrrigationControllerService } from '../services/IrrigationController1.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService,
              private service: IrrigationControllerService) { }

  ngOnInit() {
    this.service.redirectUserToLandingPage();
  }

}
