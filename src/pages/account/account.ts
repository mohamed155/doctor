import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { TicketPage } from '../ticket/ticket';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController) {

  }

  onGoBack() {
    this.navCtrl.pop();
  }

  onGoToHomePage() {
    this.navCtrl.popToRoot();
  }

  onGoToTickets() {
    this.navCtrl.push(TicketPage);
  }

}
