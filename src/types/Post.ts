export interface IPost {
    _id: string;
    userImage: string;
    userName: string;
    title: string;
    description: string;
    tags: string[];
    commentsCount: number;
    rating: number;
}

export interface Tag {
    tag: string;
    tagCount: number;
  }

  export interface IUser {
    avatar?: string;
    userName: string;
    password?: string;
    quote?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    city?: string;
    about?: string;
    email?: string;
    tags: string[];
    posts: any;
  }