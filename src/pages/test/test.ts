import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {AccountPage} from "../account/account";
import { TicketPage } from '../ticket/ticket';
import { LoginPage } from '../login/login';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";
import {Headers, Http} from "@angular/http";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {SharedProvider} from "../../providers/shared/shared";
import {TestDetailsPage} from "../test-details/test-details";

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  testLabs = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public config: ConfigurationProvider,
    public http: Http,
    public shared: SharedProvider
  ) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.http.get(`http://mashfac.com/api/clients/medical?api_token=${shared.loggedUser.api_token}`)
      .map(res => res.json())
      .subscribe(data => {
        this.testLabs = data.data; 
        console.log(this.testLabs);
        loader.dismiss();
      }, () => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Error',
          message: 'Could not connect to server'
        }).present();
      });
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

  onGoToTest(lab) {
    this.navCtrl.push(TestDetailsPage, {lab});
  }

}
