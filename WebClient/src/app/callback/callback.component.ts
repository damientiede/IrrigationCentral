import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IrrigationControllerService } from '../services/IrrigationController1.service';
import { IUser } from '../model/user';
import { IDevice } from '../model/device';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  authSuccessful: boolean;
  constructor(private router: Router,
              private authService: AuthService,
              private service: IrrigationControllerService) { }

  ngOnInit() {
    this.authService.handleLoginCallback(() => {
      this.router.navigate(['home']);
    });
  }
}
