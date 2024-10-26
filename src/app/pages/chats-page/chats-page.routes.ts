import { Routes } from "@angular/router";
import { ChatsPageComponent } from "./chats-page.component";
import { ChatWrapperComponent } from "./chat-wrapper/chat-wrapper.component";
import { SearchLayoutComponent } from "../../common-ui/search-layout/search-layout.component";

export const ChatsPageRoutes: Routes = [{
  path: '',
  component: ChatsPageComponent,
  children: [
    { path: '', component: SearchLayoutComponent },
    { path: ':id', component: ChatWrapperComponent},
  ]
}]