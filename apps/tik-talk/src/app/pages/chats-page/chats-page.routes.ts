import { Routes } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';
import { ChatWrapperComponent } from '@tt/chats';
import { SearchLayoutComponent } from '@tt/common-ui';

export const ChatsPageRoutes: Routes = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      { path: '', component: SearchLayoutComponent },
      { path: ':id', component: ChatWrapperComponent },
    ],
  },
];
