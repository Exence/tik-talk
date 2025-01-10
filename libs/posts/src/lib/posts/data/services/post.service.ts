import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Post,
  PostCreateDto,
  CommentCreateDto,
  Comment,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';
import { baseApiUrl } from '@tt/shared';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #httpClient = inject(HttpClient);

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#httpClient.post<Post>(`${baseApiUrl}/post/`, payload)
  }

  getPosts() {
    return this.#httpClient.get<Post[]>(`${baseApiUrl}/post/`).pipe(
      tap((res) => {
        this.posts.set(res);
      })
    );
  }

  getCommenstByPostId(postId: number) {
    return this.#httpClient
      .get<Post>(`${baseApiUrl}/post/${postId}`)
      .pipe(map((res) => res.comments));
  }

  createComment(payload: CommentCreateDto) {
    return this.#httpClient.post<Comment>(`${baseApiUrl}/comment/`, payload);
  }
}
