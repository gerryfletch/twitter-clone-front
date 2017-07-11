export interface User {
  uid: number;
  handle: string;
  display_name: string;
  profile_picture: string;
}

export interface UsersArray {
  users: User[];
}
