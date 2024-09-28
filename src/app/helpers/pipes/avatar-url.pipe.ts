import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarUrlPipe',
  standalone: true
})
export class AvatarUrlPipe implements PipeTransform {
  private baseExternalUrl = 'https://icherniakov.ru/yt-course'
  private defaultImgUrl = '/assets/imgs/avatar-placeholder.png'
  transform(imgUrl: string | null): string {
    
    return imgUrl? `${this.baseExternalUrl}/${imgUrl}` : this.defaultImgUrl;
  }

}
