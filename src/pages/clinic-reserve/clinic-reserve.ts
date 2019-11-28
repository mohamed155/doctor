import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ConfirmReservationPage} from "../confirm-reservation/confirm-reservation";

@Component({
  selector: 'page-clinic-reserve',
  templateUrl: 'clinic-reserve.html'
})
export class ClinicReservePage {

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
    // this.navCtrl.push(RegisterDoctorPage);
  }

  onGoToConfirmReservation() {
    this.navCtrl.push(ConfirmReservationPage);
  }
}
