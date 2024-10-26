import { Component, inject } from '@angular/core';
import { ChatBtnComponent } from "./chat-btn/chat-btn.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { ChatService } from '../../../data/services/chat.service';

@Component({
  selector: 'app-chats-panel',
  standalone: true,
  imports: [ChatBtnComponent, SvgIconComponent],
  templateUrl: './chats-panel.component.html',
  styleUrl: './chats-panel.component.scss'
})
export class ChatsPanelComponent {
  myChats = inject(ChatService).myChats
}
