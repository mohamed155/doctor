import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";

@Component({
  selector: 'page-register-doctor',
  templateUrl: 'register-doctor.html'
})
export class RegisterDoctorPage {

  constructor(public navCtrl: NavController) {

  }

  onGoBack() {
    this.navCtrl.pop();
  }

  onGoToHome() {
    this.navCtrl.popToRoot();
  }

  onGoToAccount() {
    this.navCtrl.push(AccountPage);
  }

  onGoToTickets() {
    this.navCtrl.push(TicketPage);
  }

}
