import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { PostService } from '../services/post.service'
import { postActions } from './actions'

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
      map((posts) => postActions.postsLoaded({ posts }))
    )
  })

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap(({ post }) => this.postService.createPost(post)),
      map(() => postActions.fetchPosts())
    )
  })
}
