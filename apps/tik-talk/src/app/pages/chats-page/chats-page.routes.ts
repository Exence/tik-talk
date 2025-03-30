import { Routes } from '@angular/router'
import { ChatWrapperComponent } from '@tt/chats'
import { SearchLayoutComponent } from '@tt/common-ui'
import { ChatsPageComponent } from './chats-page.component'

export const ChatsPageRoutes: Routes = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      { path: '', component: SearchLayoutComponent },
      { path: ':id', component: ChatWrapperComponent }
    ]
  }
]
