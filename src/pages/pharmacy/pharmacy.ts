import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AccountPage} from "../account/account";
import {TicketPage} from '../ticket/ticket';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";
import {PharmacyDetailsPage} from "../pharmacy-details/pharmacy-details";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {ConfigurationProvider} from "../../providers/cofiguration/cofiguration";
import {Headers, Http} from "@angular/http";
import {SharedProvider} from "../../providers/shared/shared";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";


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
              public toastCtrl: ToastController,
              public shared: SharedProvider,
              private transfer: FileTransfer) {
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

  changeListener(files) {
    this.rostatFile = files.item(0);
  }

  uploadRostatFile() {
    if (!this.rostatFile) {
      this.alertCtrl.create({
        message: 'برجاء اختيار الصورة'
      }).present();
      return;
    }
    const loader = this.loadingCtrl.create();
    loader.present();
    const headers = new Headers();
    headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
    const body = new FormData();
    body.append('image', this.rostatFile, this.rostatFile.name);
    this.http.post(this.config.url + 'api/clients/roostat?api_token=' + this.shared.loggedUser.api_token,
      body,{headers}).map(res => res.json())
      .subscribe(data => {
        loader.dismiss();
        this.navCtrl.popToRoot();
        this.toastCtrl.create({
          message: "تم رفع الروشتة",
          duration: 2000
        }).present();
      }, (err) => {
        console.log(err);
        this.alertCtrl.create({
          title: 'Error',
          message: 'Could not upload photo to server'
        }).present();
        loader.dismiss();
      });
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // let fileOptions: FileUploadOptions = {
    //   fileKey: 'file',
    //   fileName: 'rostat.jpg'
    // };
    // const options: ImagePickerOptions = {
    //   maximumImagesCount: 1,
    //   quality: 100,
    //   outputType: 0
    // };
    // this.imagePicker.getPictures(options).then((results) => {
    //   console.log(results);
    //   this.rostatFile = results[0];
    //
    // }, (err) => {
    //   this.alertCtrl.create({
    //     title: 'Error',
    //     message: 'Could not take photo from gallary'
    //   }).present();
    //   loader.dismiss();
    // });
  }

}
