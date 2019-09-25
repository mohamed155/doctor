import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountPage} from "../account/account";
import { TicketPage } from '../ticket/ticket';
import { LoginPage } from '../login/login';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  constructor(public navCtrl: NavController) {

  }

  onGoToFilter() {
    this.navCtrl.push(FilterPage);
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

  onGoToRegisterDoctor() {
    this.navCtrl.push(RegisterDoctorPage);
  }

}
