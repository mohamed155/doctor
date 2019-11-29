import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from "../pages/signup/signup";
import {AccountPage} from "../pages/account/account";
import { TicketPage } from '../pages/ticket/ticket';
import {RegisterDoctorPage} from "../pages/register-doctor/register-doctor";
import {ClinicCategoryPage} from "../pages/clinic-category/clinic-category";
import {FilterPage} from "../pages/filter/filter";
import {DoctorPage} from "../pages/doctor/doctor";
import {PharmacyPage} from "../pages/pharmacy/pharmacy";
import { TestPage } from '../pages/test/test';
import {PharmacyDetailsPage} from "../pages/pharmacy-details/pharmacy-details";
import {ClinicListPage} from "../pages/clinic-list/clinic-list";
import {ClinicDetailsPage} from "../pages/clinic-details/clinic-details";
import { ClinicReservePage } from '../pages/clinic-reserve/clinic-reserve';
import {ConfirmReservationPage} from "../pages/confirm-reservation/confirm-reservation";
import { ConfigurationProvider } from '../providers/cofiguration/cofiguration';
import {HttpModule} from "@angular/http";
import { SharedProvider } from '../providers/shared/shared';
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AccountPage,
    TicketPage,
    RegisterDoctorPage,
    ClinicCategoryPage,
    FilterPage,
    DoctorPage,
    PharmacyPage,
    TestPage,
    PharmacyDetailsPage,
    ClinicListPage,
    ClinicDetailsPage,
    ClinicReservePage,
    ConfirmReservationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AccountPage,
    TicketPage,
    RegisterDoctorPage,
    ClinicCategoryPage,
    FilterPage,
    DoctorPage,
    PharmacyPage,
    TestPage,
    PharmacyDetailsPage,
    ClinicListPage,
    ClinicDetailsPage,
    ClinicReservePage,
    ConfirmReservationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationProvider,
    SharedProvider,
    Camera
  ]
})
export class AppModule {
}
