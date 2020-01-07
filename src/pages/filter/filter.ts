import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AccountPage } from "../account/account";
import { RegisterDoctorPage } from "../register-doctor/register-doctor";
import { TicketPage } from "../ticket/ticket";
import { Http } from '@angular/http';
import { SharedProvider } from '../../providers/shared/shared';
import { ConfigurationProvider } from '../../providers/cofiguration/cofiguration';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {

  governrates: any = [];
  cities: any = []; 
  specialities : any = [];
  Doctors: any = [];

  //here is the filtered array 
  filteredArray: any = []; 

  governrateID: any; 
  speciality_id : any;
  cityID: any; 


  // save the array of doctors that comes from the doctors page here in this array
  constructor(public  alertCtrl :AlertController ,  public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public shared: SharedProvider, public config: ConfigurationProvider, public navCtrl: NavController) {
    this.GetAllGovernrates(); 
    this.GetAllSpecialities();

    //this.getDoctors(2, 2);
  }

  onGoToAccount() {
    this.navCtrl.push(AccountPage);
  }

  onGoToTickets() {
    this.navCtrl.push(TicketPage);
  }

  onGoBack() {
    this.navCtrl.pop();
  }

  onGoToRegisterDoctor() {
    this.navCtrl.push(RegisterDoctorPage);
  }

  onGoToHome() {
    this.navCtrl.popToRoot();
  }

  //this function to get all the governrates for the user
  GetAllGovernrates() {
    const headers = new Headers();
    headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
    this.http.get(this.config.url + 'api/clients/governorate?api_token' + this.shared.loggedUser.api_token).map(res => res.json()).subscribe(data => {
      this.governrates = data;
      console.log(this.governrates);
    })
  }

  //this function is used to get all cities included under the choosed governrate to help the user to find the nearest doctor for him
  GetAllCities(governrate_id) {
    this.governrateID = governrate_id; 
    const headers = new Headers();
    headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`);
    this.http.get(this.config.url + 'api/clients/city/' + governrate_id + this.shared.loggedUser.api_token).map(res => res.json()).subscribe(data => {
      this.cities = data;
      console.log(this.cities);
      console.log(this.shared.loggedUser.api_token);
    })
  }

  FilterDrs(evt) { 
    this.cityID = evt;
    this.getDoctors(this.speciality_id , this.cityID , this.governrateID);
  } 

  //get specialities from the service
  GetAllSpecialities() 
  {  
    const loader = this.loadingCtrl.create();
    const headers = new Headers(); 
    headers.append('token', `Bearer ${this.shared.loggedUser.api_token}`); 
    this.http.get(this.config.url+'api/clients/specialities?api_token'+this.shared.loggedUser.api_token).map(res => res.json()).subscribe(data =>{
      if(data == null || data.length < 0)
      {
        console.log("there is no data here");
      } 
      else{
        let loader = this.loadingCtrl.create({
          content: 'جارى التحميل'
        });
        loader.present(); 
        for(let i = 0; i < data.length; i++)
        {
          this.specialities[i] = data[i];
          console.log(this.specialities[i]); 
          console.log(this.specialities[i].id)
        } 
        loader.dismiss();
        
      }
    })
   
  }
  //get doctors from the service
  getDoctors(Speciality_ID , cityID, governrate_id) {
    console.log("City and govern and speciality : ", this.specialities.id, cityID , governrate_id)
     this.http.get(`${this.config.url}api/clients/doctor/search?type=clinic&speciality_id=${Speciality_ID}&city_id=${cityID}&gov_id=${governrate_id}`).map(res => res.json()).subscribe(data => {
       console.log(`${this.config.url}api/clients/doctor/search?type=clinic&speciality_id=${Speciality_ID}&city_id=${cityID}&gov_id=${governrate_id}`);
       console.log(data);
       if (data == null || data.length < 0) {
        console.log('there is no data here');
      }
      else {
        if (data != null) {
          let loader = this.loadingCtrl.create({
            content: 'جارى التحميل'
          });
          loader.present();
          for (let i = 0; i < data.length; i++) {
            this.Doctors[i] = data[i];
            //console.log(this.Doctors[i]);
            //this.Doctors[i]['clinic']['city_id']; 
            console.log(this.Doctors[i]['clinic']['city_id']);
          }
          loader.dismiss();
        }
      }
    })
  } 

  //this function is needed to fill the speciality id needed to make filter
  getSpecialityID(SpecialityID) 
  {
    this.speciality_id = SpecialityID;
  }

}
