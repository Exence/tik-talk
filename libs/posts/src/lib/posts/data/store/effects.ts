import { inject, Injectable } from "@angular/core";
import { PostService } from "../services/post.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { postActions } from "./actions";
import { map, switchMap } from "rxjs";

Injectable({
  providedIn: 'root'
})
export class PostEffects {
  actions$ = inject(Actions)
  postService = inject(PostService)

  loadedPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchPosts),
      switchMap(() => this.postService.getPosts()),
      map(posts => postActions.postsLoaded({ posts }))
    )
  })

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap(({post}) => this.postService.createPost(post)),
      map(() => postActions.fetchPosts())
    )
  })
}