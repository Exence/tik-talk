import { Pipe, PipeTransform } from '@angular/core';
import { baseApiUrl } from '@tt/shared';

@Pipe({
  name: 'avatarUrlPipe',
  standalone: true,
})
export class AvatarUrlPipe implements PipeTransform {
  private defaultImgUrl = '/assets/imgs/avatar-placeholder.png';
  transform(imgUrl: string | null): string {
    return imgUrl ? `${baseApiUrl}/${imgUrl}` : this.defaultImgUrl;
  }
}
