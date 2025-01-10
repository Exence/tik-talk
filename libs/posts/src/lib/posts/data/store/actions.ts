import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post, PostCreateDto } from "../interfaces/post.interface";

export const postActions = createActionGroup({
  source: 'posts',
  events: {
    'fetch posts': emptyProps(),
    'posts loaded': props<{ posts: Post[] }>(),
    'create post': props<{ post: PostCreateDto }>()
  }
})