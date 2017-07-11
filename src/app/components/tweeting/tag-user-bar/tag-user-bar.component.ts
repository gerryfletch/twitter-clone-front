import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tag-user-bar',
  templateUrl: './tag-user-bar.component.html',
  styleUrls: ['./tag-user-bar.component.scss']
})
export class TagUserBarComponent implements OnInit {

  _profilePicture = 'assets/image/default-profile-picture.svg';
  @Input('handle') handle;
  @Input('displayName') displayName;

  @Input()
  set profilePicture(profilePicture: string) {
    if (profilePicture !== null) {
      this._profilePicture = profilePicture;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
