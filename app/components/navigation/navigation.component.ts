import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  homeActive = false;
  notificationsActive = false;
  searchActive = false;
  menuActive = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    this.homeActive =          (this.router.url === '/dashboard');
    this.notificationsActive = (this.router.url === '/notifications');
    this.searchActive =        (this.router.url === '/search');
    this.menuActive =          (this.router.url === '/menu');

  }

}
