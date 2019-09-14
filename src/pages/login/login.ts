import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import { HomePage } from '../home/home';

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

  onSubmit() {
    this.navCtrl.push(HomePage);
  }

}
