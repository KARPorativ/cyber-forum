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