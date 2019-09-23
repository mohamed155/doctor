import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountPage} from "../account/account";
import { TicketPage } from '../ticket/ticket';
import { LoginPage } from '../login/login';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";

@Component({
  selector: 'page-clinic-category',
  templateUrl: 'clinic-category.html'
})
export class ClinicCategoryPage {

  constructor(public navCtrl: NavController) {

  }

}
