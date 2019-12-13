import {Component} from "@angular/core";
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ClinicDetailsPage} from "../clinic-details/clinic-details";
import {Headers, Http} from "@angular/http";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {SharedProvider} from "../../providers/shared/shared";

@Component({
  selector: 'page-clinic-list',
  templateUrl: 'clinic-list.html'
})
export class ClinicListPage {

  category_id;

  clinicList = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public config: ConfigurationProvider,
    public shared: SharedProvider
  ) {
    this.category_id = this.navParams.get('category_id');
    const loader = this.loadingCtrl.create();
    loader.present();
    const headers = new Headers();
    headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
    this.http.get(config.url + 'api/specialties/' + this.category_id + '?api_token=' + this.shared.loggedUser.api_token)
      .map(res => res.json())
      .subscribe(data => {
        loader.dismiss();
        this.clinicList = data.data.partners;
      }, error => {
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

  onGoToClinicDetails() {
    this.navCtrl.push(ClinicDetailsPage);
  }

}
