import { Component } from '@angular/core';
import {ActionSheetController, AlertController, LoadingController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Http} from "@angular/http";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {SharedProvider} from "../../providers/shared/shared";
import {NgForm} from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Facebook, FacebookLoginResponse  } from '@ionic-native/facebook';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  avatar;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public config: ConfigurationProvider,
    public shared: SharedProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public imagePicker: ImagePicker,
    public fb: Facebook
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
          handler: () => {
            const loader = this.loadingCtrl.create();
            loader.present();
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            }
            this.camera.getPicture(options).then((imageData) => {
             this.avatar = 'data:image/jpeg;base64,' + imageData;
             loader.dismiss();
            }, (err) => {
              this.alertCtrl.create({
                title: 'Error',
                message: 'Could not take photo from camera'
              }).present();
              loader.dismiss();
            });
          }
        },
        {
          text: 'Choose an image from galary',
          handler: () => {
            const loader = this.loadingCtrl.create();
            loader.present();
            const options: ImagePickerOptions = {
              maximumImagesCount: 1,
              quality: 100,
              outputType: 1
            }
            this.imagePicker.getPictures(options).then((results) => {
              this.avatar = results[0];
              loader.dismiss();
            }, (err) => { 
              this.alertCtrl.create({
                title: 'Error',
                message: 'Could not take photo from gallary'
              }).present();
              loader.dismiss();
            });
          }
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
    this.http.post(this.config.url + 'api/clinte_login', 
    {...form.value, avatar: this.avatar}).map(res => res.json())
      .subscribe(data => {
        this.navCtrl.setRoot(HomePage);
        this.shared.loggedUser = data.data;
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Error',
          message: 'Could not sign up now try again later'
        }).present();
      });
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));

  }

}
