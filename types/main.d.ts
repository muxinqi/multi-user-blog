export interface User {
  id: number;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt: string;
  posts?: (Post)[] | null;
  comments?: (Comment)[] | null;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  createdAt: string;
  rawContent: string;
  renderedContent: string;
  published: boolean;
  author: User;
  likesCount: number;
  viewsCount: number;
  tags?: (Tag)[] | null;
  comments?: (Comment)[] | null;
}

export interface Comment {
  id: number;
  createdAt: string;
  rawContent: string;
  renderedContent: string;
  author: User;
  post: Post;
}

export interface Tag {
  id: number;
  name: string;
  posts?: (Post)[] | null;
}
