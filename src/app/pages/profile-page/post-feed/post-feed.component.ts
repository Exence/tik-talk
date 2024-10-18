import { Component, inject, Input } from '@angular/core';
import { PostService } from '../../../data/services/post.service';
import { AsyncPipe } from '@angular/common';
import { SinglePostComponent } from "./single-post/single-post.component";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [AsyncPipe, SinglePostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
  posts$ = inject(PostService).getPosts()
}
