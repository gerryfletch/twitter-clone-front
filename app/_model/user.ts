export class User {
  uid: number;
  display_name: string;
  handle: string;
  profile_picture: string;

  constructor(
    uid: number,
    display_name: string,
    handle: string,
    profile_picture: string
  ) {
    this.uid = uid;
    this.display_name = display_name;
    this.handle = handle;
    this.profile_picture = profile_picture;
  }

}
