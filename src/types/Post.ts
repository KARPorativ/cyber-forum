export interface IPost {
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