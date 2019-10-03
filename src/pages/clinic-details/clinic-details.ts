import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";

@Component({
  selector: 'page-clinic-details',
  templateUrl: 'clinic-details.html'
})
export class ClinicDetailsPage {

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
