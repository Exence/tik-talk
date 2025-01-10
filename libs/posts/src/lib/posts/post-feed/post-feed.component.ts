import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';
import { SinglePostComponent } from './single-post/single-post.component';
import { auditTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { postActions, selectPosts } from '../data';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [SinglePostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  store$ = inject(Store)
  posts = this.store$.selectSignal(selectPosts);

  #destroy$ = new Subject<void>();

  #hostElement = inject(ElementRef);
  #r2 = inject(Renderer2);

  constructor() {
    this.store$.dispatch(postActions.fetchPosts())
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.resizeFeed(), 100);

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.#destroy$), auditTime(500))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.#hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;

    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`);
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
