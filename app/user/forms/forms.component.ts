/**
 * Created by Gerry on 13/06/2017.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'app-forms',
  template: `
    <app-login-comp *ngIf="show"></app-login-comp>
    <app-signup-comp *ngIf="!show"></app-signup-comp>
    <button (click)="changeShow()">{{show ? 'or, register' : 'or, login'}}</button>
  `
})
export class FormsComponent {
  show: boolean;
  constructor() {
    this.show = true;
  }
  changeShow() {
    this.show = ! this.show;
  }
}
