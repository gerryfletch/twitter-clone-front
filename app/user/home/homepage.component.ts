import {Component} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.scss']
})
export class HomePageComponent {
  show: boolean;
  constructor() {
    console.log("SHOW: " + this.show);
  }
}
