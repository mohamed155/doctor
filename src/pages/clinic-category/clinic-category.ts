import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {AccountPage} from "../account/account";
import {TicketPage} from '../ticket/ticket';
import {LoginPage} from '../login/login';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";
import {ClinicListPage} from "../clinic-list/clinic-list";
import {Http, Headers} from '@angular/http';
import {SharedProvider} from '../../providers/shared/shared';
import {ConfigurationProvider} from '../../providers/cofiguration/cofiguration';

@Component({
  selector: 'page-clinic-category',
  templateUrl: 'clinic-category.html'
})
export class ClinicCategoryPage {

  categories = [];

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public shared: SharedProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public config: ConfigurationProvider
  ) {
    const loader = this.loadingCtrl.create();
    loader.present();
    // const headers = new Headers();
    // headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
    this.http.get(config.url + 'api/specialties?api_token=' + this.shared.loggedUser.api_token)
      .map(res => res.json())
      .subscribe(data => {
        this.categories = data.data;
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

  onGoToClinicList(category_id) {
    this.navCtrl.push(ClinicListPage, {category_id});
  }

}
