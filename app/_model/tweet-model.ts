export interface Profile {
  handle: string;
  display_name: string;
  profile_picture: string;
}

export interface UserMention {
  handle: string;
  indices: number[];
}

export interface Hashtag {
  tag: string;
  indices: number[];
}

export interface Entities {
  user_mentions: UserMention[];
  hashtags: Hashtag[];
}

export interface Tweet {
  author_id: number;
  timestamp: string;
  profile: Profile;
  body: string;
  entities: Entities;
}
