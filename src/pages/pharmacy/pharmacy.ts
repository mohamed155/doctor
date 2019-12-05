import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AccountPage} from "../account/account";
import {TicketPage} from '../ticket/ticket';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";
import {PharmacyDetailsPage} from "../pharmacy-details/pharmacy-details";

@Component({
  selector: 'page-pharmacy',
  templateUrl: 'pharmacy.html'
})
export class PharmacyPage {

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

  onGoToPharmacyPage() {
    this.navCtrl.push(PharmacyDetailsPage);
  }

}
