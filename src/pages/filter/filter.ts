import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountPage} from "../account/account";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {TicketPage} from "../ticket/ticket";

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {

  constructor(public navCtrl: NavController) {

  }

  onGoToAccount() {
    this.navCtrl.push(AccountPage);
  }

  onGoToTickets() {
    this.navCtrl.push(TicketPage);
  }

  onGoBack() {
    this.navCtrl.pop();
  }

  onGoToRegisterDoctor() {
    this.navCtrl.push(RegisterDoctorPage);
  }

  onGoToHome() {
    this.navCtrl.popToRoot();
  }

}
