import { Component } from '@angular/core';
import {HomePage} from '../../pages/home/home';

@Component({
  selector: 'component-tabs',
  template: 'tabs.html'
})
export default class TabsComponent {

  homePage = HomePage;

}