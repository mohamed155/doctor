import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html'
})
export class TicketPage {

  constructor(public navCtrl: NavController) {

  }

  onGoBack() {
    this.navCtrl.pop();
  }

  onGoToHomePage() {
    this.navCtrl.popToRoot();
  }

  onGoToAccount() {
    this.navCtrl.push(AccountPage);
  }

}
