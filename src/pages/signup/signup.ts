import { Component } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Http} from "@angular/http";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {SharedProvider} from "../../providers/shared/shared";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  profileImage;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public config: ConfigurationProvider,
    public shared: SharedProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
    ) {
  }

  onGoBack() {
    this.navCtrl.pop();
  }

  handleProfilePicClick() {
    this.actionSheetCtrl.create({
      title: 'Upload your profile picture',
      buttons: [
        {
          text: 'Take a photo with camera',
          handler: () => {}
        },
        {
          text: 'Choose an image from galary',
          handler: () => {}
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    }).present();
  }

  onSubmit(form: NgForm) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.http.post(this.config.url + 'api/clinte_login', form.value).map(res => res.json())
      .subscribe(data => {
        this.navCtrl.setRoot(HomePage);
        this.shared.loggedUser = data.data;
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Error',
          message: err
        }).present();
      });
  }

}
