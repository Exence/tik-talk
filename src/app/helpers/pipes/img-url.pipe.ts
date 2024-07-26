import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrlPipe',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {
  private baseExternalUrl = 'https://icherniakov.ru/yt-course'
  private defaultImgUrl = '/assets/imgs/avatar-placeholder.png'
  transform(imgUrl: string | null): string {
    
    return imgUrl? `${this.baseExternalUrl}/${imgUrl}` : this.defaultImgUrl;
  }

}
