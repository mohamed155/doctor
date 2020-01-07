import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ClinicReservePage} from "../clinic-reserve/clinic-reserve";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {Http} from "@angular/http";
import {SharedProvider} from "../../providers/shared/shared";

@Component({
  selector: 'page-clinic-details',
  templateUrl: 'clinic-details.html'
})
export class ClinicDetailsPage {
  id: {};
  SpecificDrData: any = [];
  dates = [];

  constructor(public config: ConfigurationProvider, public http: Http, public shared: SharedProvider, public loadingCtrl: LoadingController, public navParams: NavParams, public navCtrl: NavController) {
    this.id = this.navParams.get('id');
    console.log(this.id);
    this.GetDrWorkingDays();
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

// m3aia ?!?!


//yes
  onGoToTickets() {
    this.navCtrl.push(TicketPage);
  }

  onGoToRegisterDoctor() {
    this.navCtrl.push(RegisterDoctorPage);
  }

  onGoToReserveClinic(spdetails, alldata, dateDate, date, dateId) {
    this.navCtrl.push(ClinicReservePage, {sp: spdetails, dataObj: alldata, dateDate, date, dateId});
  }

  /**************Booking functions***********/
  GetDrWorkingDays() {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.http.get(this.config.url + 'api/clients/doctor/select/' + this.id).map(res => res.json()).subscribe(data => {
      loader.dismiss();
      this.SpecificDrData = data;
      console.log(this.SpecificDrData);
      console.log(Object.keys(this.SpecificDrData['work_days']));
      this.dates = Object.keys(this.SpecificDrData['work_days']);
      this.SpecificDrData['work_days_arr'] = [];
      let keys = Object.keys(this.SpecificDrData['work_days']);
      for (let i = 0; i < keys.length; i++) {
        this.SpecificDrData['work_days_arr'].push(this.SpecificDrData['work_days'][keys[i]]);
        if (this.SpecificDrData['work_days_arr'][i].length > 0) {
          for (let j = 0; j < this.SpecificDrData['work_days_arr'][i].length; j++) {
            let from = new Date();
            from.setHours(this.SpecificDrData['work_days_arr'][i][j]['from'].substr(0, 2));
            from.setMinutes(this.SpecificDrData['work_days_arr'][i][j]['from'].substr(3, 2))
            console.log(from);
            let to = new Date();
            to.setHours(this.SpecificDrData['work_days_arr'][i][j]['to'].substr(0, 2));
            to.setMinutes(this.SpecificDrData['work_days_arr'][i][j]['to'].substr(3, 2))
            this.SpecificDrData['work_days_arr'][i][j]['to_date'] = to;
            this.SpecificDrData['work_days_arr'][i][j]['from_date'] = from;
          }
        }
      }
      console.log(this.SpecificDrData['work_days_arr']);
    })
  }

}
