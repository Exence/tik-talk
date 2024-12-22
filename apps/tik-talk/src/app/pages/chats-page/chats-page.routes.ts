import { Routes } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';
import { SearchLayoutComponent } from '../../common-ui/search-layout/search-layout.component';
import { ChatWrapperComponent } from '@tt/chats';

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
