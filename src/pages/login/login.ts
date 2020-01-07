import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { HomePage } from '../home/home';
import { Http,Headers } from "@angular/http";
import { ConfigurationProvider } from "../../providers/cofiguration/cofiguration";
import { NgForm } from "@angular/forms";
import { SharedProvider } from "../../providers/shared/shared";
// import {map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Facebook, FacebookLoginResponse  } from '@ionic-native/facebook';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public config: ConfigurationProvider,
    public shared: SharedProvider,
    public alertCtrl: AlertController,
    public fb: Facebook
  ) {

  }

  onGoToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  onSubmit(form: NgForm) {
    const loader = this.loadingCtrl.create();
    loader.present(); 

    this.http.post(this.config.url + 'api/clinte_login?', form.value).map(res => res.json())
      .subscribe(data => {
        this.navCtrl.setRoot(HomePage);
        this.shared.loggedUser = data.data; 
        console.log(this.shared.loggedUser);
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Error',
          message: 'Could not login now try again later'
        }).present();
      });
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
  }

}
