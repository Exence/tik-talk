import { Component } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { PostInputComponent } from "../../../common-ui/post-input/post-input.component";

@Component({
  selector: 'app-chat-wrapper',
  standalone: true,
  imports: [ChatHeaderComponent, PostInputComponent],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.scss'
})
export class ChatWrapperComponent {

}
