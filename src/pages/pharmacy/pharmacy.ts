import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {AccountPage} from "../account/account";
import {TicketPage} from '../ticket/ticket';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";
import {PharmacyDetailsPage} from "../pharmacy-details/pharmacy-details";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {Headers, Http} from "@angular/http";
import {SharedProvider} from "../../providers/shared/shared";

@Component({
  selector: 'page-pharmacy',
  templateUrl: 'pharmacy.html'
})
export class PharmacyPage {

  rostatFile;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public imagePicker: ImagePicker,
              public alertCtrl: AlertController,
              public config: ConfigurationProvider,
              public http: Http,
              public shared: SharedProvider) {
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

  onGoToPharmacyPage() {
    this.navCtrl.push(PharmacyDetailsPage);
  }

  uploadRostatFile() {
    const loader = this.loadingCtrl.create();
    loader.present();
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 100,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.rostatFile = results[0];
      const headers = new Headers();
      headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
      this.http.post(this.config.url + 'api/clients/roostat?api_token=' + this.shared.loggedUser.api_token,
        {image: this.rostatFile},{headers}).map(res => res.json())
        .subscribe(data => {
          loader.dismiss();
        }, () => {
          this.alertCtrl.create({
            title: 'Error',
            message: 'Could not upload photo to server'
          }).present();
          loader.dismiss();
        });
    }, (err) => {
      this.alertCtrl.create({
        title: 'Error',
        message: 'Could not take photo from gallary'
      }).present();
      loader.dismiss();
    });
  }

}
