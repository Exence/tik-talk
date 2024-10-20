import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Post, PostCreateDto, CommentCreateDto, Comment } from "../interfaces/post.interface";
import { firstValueFrom, map, switchMap, tap } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  #httpClient = inject(HttpClient)
  #baseApiUrl = 'https://icherniakov.ru/yt-course'

  posts = signal<Post[]>([])

  createPost(payload: PostCreateDto) {
    return this.#httpClient.post<Post>(
      `${this.#baseApiUrl}/post/`,
      payload
    ).pipe(
      switchMap(() => {
        return this.getPosts()
      })
    )
  }

  getPosts() {
    return this.#httpClient.get<Post[]>(
      `${this.#baseApiUrl}/post/`
    ).pipe(
      tap(res => {
        this.posts.set(res)
      })
    )
  }

  getCommenstByPostId(postId: number) {
    return this.#httpClient.get<Post>(`${this.#baseApiUrl}/post/${postId}`).pipe(
      map(res => res.comments)
    )
  }

  createComment(payload: CommentCreateDto) {
    return this.#httpClient.post<Comment>(
      `${this.#baseApiUrl}/comment/`,
      payload
    )
  }

}