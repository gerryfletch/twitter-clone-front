export class User {
  public uid: number;
  public displayName: string;
  public handle: string;
  public profilePicture: string;

  constructor(
    uid: number,
    display_name: string,
    handle: string,
    profile_picture: string
  ) {
    this.uid = uid;
    this.displayName = display_name;
    this.handle = handle;
    this.profilePicture = profile_picture;
  }

}
