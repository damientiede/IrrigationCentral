import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { IrrigationControllerService} from '../services/IrrigationController.service';
import { IUser } from '../model/user';
import { NavService } from '../services/nav.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public user: IUser;
  email: string;
  password = '';
  confirm = '';
  validated = false;
  passwordsMatch = false;

  constructor(private service: IrrigationControllerService,
    private route: ActivatedRoute,
    private nav: NavService) { }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.email = params['uid'];
      if (this.email === '') {
        console.log('missing uid');
      } else {
        this.service.getUser(this.email)
          .subscribe((user: IUser) => {
            this.user = user;
          });
      }
    });
  }
  getConfirmClass() {
    if (!this.validated) { return ''; }
    if (!this.confirmValid()) {
      return 'invalid';
    }
    return '';
  }
  getPasswordClass() {
    if (!this.validated) { return ''; }
    if (!this.passwordValid()) {
      return 'invalid';
    }
    return '';
  }
  confirmValid() {
    return (this.validated && this.confirm.length > 1);
  }
  passwordValid() {
    return (this.validated && this.password.length > 1);
  }

  displayValidation() {
    if (this.confirmValid() && this.passwordValid()) {
      if (this.password !== this.confirm) {
        return true;
      }
    }
    return false;
  }
  ok() {
    this.validated = true;
    if (this.confirmValid() && this.passwordValid()) {
      if (this.password === this.confirm) {
        alert('passwords match!');
        this.service.recoverPassword(this.email)
          .subscribe(() => {
            // password reset requested
            this.nav.NavTo('/login');
          });
      }
    }
  }
}
