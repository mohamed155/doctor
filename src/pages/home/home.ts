import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {AccountPage} from "../account/account";
import { TicketPage } from '../ticket/ticket';
import { LoginPage } from '../login/login';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ClinicCategoryPage} from "../clinic-category/clinic-category";
import {DoctorPage} from "../doctor/doctor";
import {PharmacyPage} from "../pharmacy/pharmacy";
import { TestPage } from '../test/test';
import {SharedProvider} from "../../providers/shared/shared";
import {Http} from "@angular/http";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import { SpecialitiesPage } from '../specialities/specialities';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public config: ConfigurationProvider,
     public http : Http ,
     public loadingCtrl : LoadingController , 
     public navCtrl: NavController, 
     public shared: SharedProvider) {

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
      //this.navCtrl.push(DoctorPage);
      this.navCtrl.push(SpecialitiesPage);
  }

  onGoToPharmacy() {
    this.navCtrl.push(PharmacyPage);
  }

  onGoToTest() {
    this.navCtrl.push(TestPage);
  }
}
