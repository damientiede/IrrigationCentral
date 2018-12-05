import { Component, Input, OnInit } from '@angular/core';
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IUser } from '../model/user';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authFailed = false;
  email = 'damien@tiede.co.nz'; // string;
  password = 'foobar'; // string;

  constructor(private service: IrrigationControllerService,
              private nav: NavService) { }

  login() {
    this.authFailed = false;
    console.log(`email: ${this.email} pass: ${this.password}`);

    this.service.login(this.email, this.password)
    // .map((res: Response) => res.json())
    .subscribe(
      data => {
        console.log(data);
        this.nav.NavTo('/devices');
      },
      error => {
        console.log(error);
        this.authFailed = true;
      },
      () => console.log('success')
    );
  }
  newUser() {
    const user = new IUser (
      null,         // Id
      'Damo',       // firstName
      'Da Man',     // lastName
      this.email,   // email
      '0279201482', // mobile
      this.password,  // password
      null,   // CreatedAt
      null,   // UpdatedAt
      null    // Salt
    );
    console.log(user);
    this.service.createUser(user)
      .subscribe((u) => {
        console.log(u);
      });
  }
}

