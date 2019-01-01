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
      if (this.authService.isLoggedIn) {
        const username = this.authService.userProfile.name;
        this.service.getUser(username)
                    .subscribe((user: IUser) => {
                      if (user === null) { return; }
                      if (user.devices.length > 1) {
                        this.router.navigate(['/devices']);
                      } else {
                        const device = user.devices[0];
                        if (device != null) {
                          this.router.navigate([`/device/${device.id}`]);
                      }
                    }
        });
      }
    });
  }
}
