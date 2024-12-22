import { Profile } from "@tt/profiles";

export interface PostCreateDto {
  title: string;
  content: string | null;
  authorId: number | null;
  communityId: number | null;
}

export interface Post {
  id: number;
  title: string;
  communityId: number | null;
  content: string | null;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string | null;
  likes: number;
  comments: Comment[];
}

export interface CommentCreateDto {
  text: string;
  authorId: number | null;
  postId: number;
  commentId: number | null;
}

export interface Comment {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number | null;
  createdAt: string;
  updatedAt: string | null;
  comments: Comment[];
}
