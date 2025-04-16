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
    _id: string;
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
    likeCount: number;
  }

  export interface IComment {
    _id: string;
    author: IUser;
    post: IPost;
    image?: string;
    text: string;
    datePublication: string;
    likesCount: number;
    likeComments: ILikePost[];
  }
  
  export interface ILikePost {
    _id?: string;
    user: IPost;
    post: IPost;
  }