import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";

@Component({
  selector: 'page-confirm-reservation',
  templateUrl: 'confirm-reservation.html'
})
export class ConfirmReservationPage {

  alldata;
  dateDate;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alldata = this.navParams.get('dataObj');
    this.dateDate = this.navParams.get('dateDate');
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
