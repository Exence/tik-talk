import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post, PostCreateDto } from "../interfaces/post.interface";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  #httpClient = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course'

  createPost(payload: PostCreateDto) {
    return this.#httpClient.post<Post>(
      `${this.baseApiUrl}/post/`,
      payload
    )
  }
}