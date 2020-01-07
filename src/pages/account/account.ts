import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import { TicketPage } from '../ticket/ticket';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {SharedProvider} from "../../providers/shared/shared";
import {Http, Headers} from "@angular/http";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  historyData;

  constructor(public navCtrl: NavController, public config: ConfigurationProvider, public shared: SharedProvider, public loadingCtrl: LoadingController, public http: Http) {
    const loader = this.loadingCtrl.create();
    loader.present();
    const headers = new Headers();
    headers.append('api_token', 'Bearer ' + this.shared.loggedUser.api_token);
    this.http.get(this.config.url + 'api/clients/booking/all?api_token=' + this.shared.loggedUser.api_token, {headers})
      .map(res => res.json())
      .subscribe(data => {
        loader.dismiss();
        this.historyData = data;
      })
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

  onGoToRegisterDoctor() {
    this.navCtrl.push(RegisterDoctorPage);
  }

}
