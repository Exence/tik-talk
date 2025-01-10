import { createFeature, createReducer, on } from "@ngrx/store";
import { Post } from "../interfaces/post.interface";
import { postActions } from "./actions";

export interface PostState {
  posts: Post[]
}

export const initialState: PostState = {
  posts: []
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(
      postActions.postsLoaded,
      (state: PostState, payload) => {
        return {
          ...state,
          posts: payload.posts
        }
      }
    )
  )
})