import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2 } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { ChatService, ChatsPanelComponent } from '@tt/chats'
import { auditTime, firstValueFrom, fromEvent, Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ChatsPanelComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPageComponent {
  #chatService = inject(ChatService)

  #destroy$ = new Subject<void>()
  #hostElement = inject(ElementRef)
  #r2 = inject(Renderer2)

  chats = this.#chatService.myChats

  constructor() {
    firstValueFrom(this.#chatService.getMyChats())
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.resizeFeed(), 100)

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.#destroy$), auditTime(500))
      .subscribe(() => {
        this.resizeFeed()
      })
  }

  resizeFeed() {
    const { top } = this.#hostElement.nativeElement.getBoundingClientRect()

    const height = window.innerHeight - top - 24

    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`)
  }

  ngOnDestroy(): void {
    this.#destroy$.next()
    this.#destroy$.complete()
  }
}
