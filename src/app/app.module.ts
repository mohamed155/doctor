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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AccountPage,
    TicketPage,
    RegisterDoctorPage,
    ClinicCategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    ClinicCategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
