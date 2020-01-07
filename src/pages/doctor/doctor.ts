import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {AccountPage} from "../account/account";
import {TicketPage} from '../ticket/ticket';
import {RegisterDoctorPage} from "../register-doctor/register-doctor";
import {FilterPage} from "../filter/filter";
import { ConfigurationProvider } from '../../providers/cofiguration/cofiguration';
import { Http } from '@angular/http';
import { SharedProvider } from '../../providers/shared/shared';
import { ClinicDetailsPage } from '../clinic-details/clinic-details';

@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html'
})
export class DoctorPage {

  public Doctors : any = [];
  public SearchTerm : any = "";
  public ID : any;
  public Name : any;


  constructor(public navParams : NavParams , public alertCtrl : AlertController , public loadingCtrl : LoadingController , public http : Http , public config : ConfigurationProvider , public shared : SharedProvider , public navCtrl: NavController) {
  this.ID = this.navParams.get('id');
  this.Name = this.navParams.get('name');
  console.log(this.Name);
  console.log(this.ID);
  this.getalldrs();
  this.setFilteredItems();
  }

  onGoToFilter() {
    //pass the doctors array to the filter page to apply filter on it
    this.navCtrl.push(FilterPage , {DoctorsArray:this.Doctors});
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

  onGotoClinicDetails(id)
  {
    this.navCtrl.push(ClinicDetailsPage , {id : id});
  }

  getalldrs()
  {
    let loader = this.loadingCtrl.create({
      content : 'جارى التحميل'
    });
    loader.present();
    this.http.get(this.config.url + 'api/clients/doctor/search?type=clinic&speciality_id='+this.ID).map(res => res.json()).subscribe(data =>{
      console.log(data);
      if(data == null || data.length < 0)
      {
        console.log('there is no data here');
      }
      else{

        if(data != null)
        {
          for(let i = 0; i < data.length; i++)
          {
            this.Doctors[i] = data[i];
            //console.log(this.Doctors[i]);
            console.log(this.Doctors[i]['specialty_id']);
          }
          loader.dismiss();

        }
      }
    })
  }
  /********************Search logic starts from here***********************/
  filterItems(st)
  {
    return this.Doctors.filter((data)=> {
      return data.name.toLowerCase().includes(st.toLowerCase());
    });
  }

  setFilteredItems()
  {
    this.Doctors = this.filterItems(this.SearchTerm);
    console.log(this.Doctors);
    return this.Doctors;
  }

}
