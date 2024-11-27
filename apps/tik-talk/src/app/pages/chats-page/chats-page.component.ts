import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChatsPanelComponent } from './chats-panel/chats-panel.component';
import { ChatService } from '../../data/services/chat.service';
import {
  auditTime,
  firstValueFrom,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ChatsPanelComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
export class ChatsPageComponent implements OnInit {
  #chatService = inject(ChatService);

  #destroy$ = new Subject<void>();
  #hostElement = inject(ElementRef);
  #r2 = inject(Renderer2);

  chats = this.#chatService.myChats;

  ngOnInit(): void {
    firstValueFrom(this.#chatService.getMyChats());
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

    const height = window.innerHeight - top - 24;

    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`);
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
