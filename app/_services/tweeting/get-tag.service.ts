import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import {User} from '../../_model/user';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetTagService {

  constructor(private authHttp: AuthHttp) { }

  getTags(handle: string): Observable<User[]> {
    const apiURL = 'api/tweet/get/tags';
    const request = {'tag': handle};

    return this.authHttp.post(apiURL, request)
      .map(res => res.json().users)
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  getTags2(handle: string): User[] {
    const apiURL = 'api/tweet/get/tags';
    const request = {'tag': handle};

    let users: User[] = [];
    this.authHttp.post(apiURL, request)
      .subscribe(
        result => {
          let usersJson = result.json().users;
          const numUsers = usersJson.innerLength;

          for(let i = 0; i < usersJson.length; i++) {
            const uid = usersJson[i].uid;
            const handle = usersJson[i].handle;
            const displayName = usersJson[i].display_name;
            let profilePicture = usersJson[i].profile_picture;
            if(profilePicture === null) {
              profilePicture = '';
            }
            const user = new User(uid, displayName, handle, profilePicture);
            users.push(user);
          }

          return users;
        },
        error => {
          return;
        }
      );

    return users;
  }

}
