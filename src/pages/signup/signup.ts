import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController) {

  }

  onGoBack() {
    this.navCtrl.pop();
  }

  onSubmit() {
    this.navCtrl.setRoot(HomePage);
  }

}
