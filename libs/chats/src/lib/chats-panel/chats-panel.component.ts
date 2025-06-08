import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { SvgIconComponent } from '@tt/common-ui'
import { ChatService } from '@tt/data-access'
import { map, startWith, switchMap } from 'rxjs'
import { ChatBtnComponent } from '../chat-btn/chat-btn.component'

@Component({
  selector: 'tt-chats-panel',
  standalone: true,
  imports: [AsyncPipe, ChatBtnComponent, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './chats-panel.component.html',
  styleUrl: './chats-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPanelComponent {
  chatService = inject(ChatService)

  chatSearch = new FormControl()

  filteredChats$ = this.chatService.getMyChats().pipe(
    switchMap((chats) => {
      return this.chatSearch.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return chats.filter((chat) =>
            `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          )
        })
      )
    })
  )
}
