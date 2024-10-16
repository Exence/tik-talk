import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post, PostCreateDto } from "../interfaces/post.interface";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  #httpClient = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course'

  sendPost(payload: PostCreateDto) {
    return firstValueFrom(this.#httpClient.post<Post>(
      `${this.baseApiUrl}/post/`,
      payload
    ))
  }
}