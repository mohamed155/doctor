import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from "../signup/signup";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  onGoToSignUp() {
    this.navCtrl.push(SignupPage);
  }

}
