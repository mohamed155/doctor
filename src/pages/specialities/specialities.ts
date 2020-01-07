import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SharedProvider } from '../../providers/shared/shared';
import { ConfigurationProvider } from '../../providers/cofiguration/cofiguration';
import { FilterPage } from '../filter/filter';
import { AccountPage } from '../account/account';
import { TicketPage } from '../ticket/ticket';
import { RegisterDoctorPage } from '../register-doctor/register-doctor';
import { ClinicListPage } from '../clinic-list/clinic-list';
import { DoctorPage } from '../doctor/doctor';

/**
 * Generated class for the SpecialitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specialities',
  templateUrl: 'specialities.html',
})
export class SpecialitiesPage {
  specialities : any = [];
  public SearchTerm : any = "";

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialitiesPage');
  }

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public shared: SharedProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public config: ConfigurationProvider
  ) {
    this.GetAllSpecialities();
    this.setFilteredItems();
  }

  GetAllSpecialities()
  {
    const loader = this.loadingCtrl.create();
    loader.present();
    const headers = new Headers();
    headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
    this.http.get(this.config.url+'api/clients/specialities?api_token='+this.shared.loggedUser.api_token).map(res => res.json()).subscribe(data => {
      this.specialities = data;
      loader.dismiss();
      console.log(this.specialities);
    },(err) =>{
      loader.dismiss();
        this.alertCtrl.create({
          title: 'Error',
          message: 'Could not connect to server'
        }).present();
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

  onGotoDrsList(id , name) {
    this.navCtrl.push(DoctorPage, {'id' : id , 'name' : name});
  }

  filterItems(st)
  {
    return this.specialities.filter((data)=> {
      return data.name.toLowerCase().includes(st.toLowerCase());
    });
  }

  setFilteredItems()
  {
    this.specialities = this.filterItems(this.SearchTerm);
  }

}
