import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, size: string = 'w500'): unknown {

    if (!img){
      return '../../assets/img/no-image-banner.jpg';
    }

    const imgUrl = `${environment.urlImg}/${size}${img}`;

    return imgUrl;
  }

}
