import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ClinicDetailsPage} from "../clinic-details/clinic-details";

@Component({
  selector: 'page-clinic-list',
  templateUrl: 'clinic-list.html'
})
export class ClinicListPage {

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

  onGoToClinicDetails() {
    this.navCtrl.push(ClinicDetailsPage);
  }

}
