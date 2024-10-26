import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { PostService } from '../../../data/services/post.service';
import { SinglePostComponent } from "./single-post/single-post.component";
import { auditTime, firstValueFrom, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [SinglePostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService)
  posts = this.postService.posts

  #destroy$ = new Subject<void>();

  #hostElement = inject(ElementRef)
  #r2 = inject(Renderer2)

  constructor() {
    firstValueFrom(this.postService.getPosts())
  }

  ngAfterViewInit(): void {
      setTimeout(() => this.resizeFeed(), 100)

      fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.#destroy$),
        auditTime(500)
      )
      .subscribe(() => {
        this.resizeFeed()
        
      })
  }

  resizeFeed() {
    const { top } = this.#hostElement.nativeElement.getBoundingClientRect()

    const height = window.innerHeight - top - 24 - 24

    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`)
  }
  
  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
