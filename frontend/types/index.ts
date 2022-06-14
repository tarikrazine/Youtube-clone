export interface Video {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
}

export interface Me {
  _id: string;
  username: string;
  email: string;
}

export enum QueryKey {
  me = 'me',
  videos = 'videos',
}
