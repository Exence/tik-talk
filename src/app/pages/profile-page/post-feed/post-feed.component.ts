import { AfterViewInit, Component, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';
import { PostService } from '../../../data/services/post.service';
import { SinglePostComponent } from "./single-post/single-post.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [SinglePostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit{
  postService = inject(PostService)
  posts = this.postService.posts

  #hostElement = inject(ElementRef)
  #r2 = inject(Renderer2)

  // TO DO: do rarely
  @HostListener('window: resize')
  onWindowResize() {
    this.resizeFeed()
  }

  constructor() {
    firstValueFrom(this.postService.getPosts())
  }

  ngAfterViewInit(): void {
      this.resizeFeed()
  }

  resizeFeed() {
    const { top } = this.#hostElement.nativeElement.getBoundingClientRect()

    const height = window.innerHeight - top - 24 - 24

    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`)
  }
  
}