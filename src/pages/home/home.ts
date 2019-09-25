import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountPage} from "../account/account";
import { TicketPage } from '../ticket/ticket';
import { LoginPage } from '../login/login';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ClinicCategoryPage} from "../clinic-category/clinic-category";
import {DoctorPage} from "../doctor/doctor";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onGoBack() {
    this.navCtrl.setRoot(LoginPage);
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

  onGoToClinicCategory() {
    this.navCtrl.push(ClinicCategoryPage);
  }

  onGoToDoctor() {
    this.navCtrl.push(DoctorPage);
  }
}
