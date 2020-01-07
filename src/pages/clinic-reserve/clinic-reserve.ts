import {Component} from "@angular/core";
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {FilterPage} from "../filter/filter";
import {AccountPage} from "../account/account";
import {TicketPage} from "../ticket/ticket";
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {ConfirmReservationPage} from "../confirm-reservation/confirm-reservation";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {Http, Headers} from "@angular/http";
import {SharedProvider} from "../../providers/shared/shared";


@Component({
  selector: 'page-clinic-reserve',
  templateUrl: 'clinic-reserve.html'
})
export class ClinicReservePage {
  responsedata: any;
  alldata: any;
  AllData: any = [];
  date;
  dateDate;
  dateId;

  selectedTime;

  constructor(public http: Http, public  config: ConfigurationProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController, public shared: SharedProvider, public alertCtrl: AlertController) {
    this.responsedata = this.navParams.get('sp');
    this.alldata = this.navParams.get('dataObj');
    this.date = this.navParams.get('date');
    this.dateDate = this.navParams.get('dateDate');
    this.dateId = this.navParams.get('dateId');
    console.log(this.date);
    this.SelectTimeUnderDate(this.responsedata, '', this.date, this.dateId);
    console.log(this.responsedata);
    console.log(this.alldata);
  }

// 1/selected_date?=&day=2019-12-19&work_time_id=4
  SelectTimeUnderDate(DrId, selected_date, day, work_time_id) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.http.get(this.config.url + 'api/clients/booking/' + DrId + '/selected_date?=' + selected_date + '&day=' + day +  '&work_time_id=' + work_time_id).map(res => res.json()).subscribe(data => {
      for (let index in data.times) {
        this.AllData.push(data.times[index]);
      }
      console.log(data.times);
      console.log('times ', this.AllData);
      loader.dismiss();
    })
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

  onGoToConfirmReservation() {
    if (!this.selectedTime) {
      this.alertCtrl.create({
        message: "اختر الميعاد للحجز",
        buttons: ['موافق']
      }).present();
      return;
    }
    const loader = this.loadingCtrl.create();
    loader.present();
    const body = new FormData();
    body.append('day', this.date + ' ' + this.selectedTime);
    body.append('partner_id', this.responsedata);
    const headers = new Headers();
    headers.append('api_token', 'Bearer ' + this.shared.loggedUser.api_token)
    this.http.post(this.config.url + 'api/clients/booking?api_token=' + this.shared.loggedUser.api_token, body, {headers}).map(res => {
      console.log('status ', res.status);
      if (res.status == 200)
        return true;
      else {
        this.alertCtrl.create({
          message: "تم حجز عذا الميعاد من قبل",
          buttons: ['موافق']
        }).present();
        return false
      }
    })
      .subscribe(data => {
        console.log(data);
        loader.dismiss();
        if (data) {
          this.navCtrl.push(ConfirmReservationPage);
        }
      });
  }
}
