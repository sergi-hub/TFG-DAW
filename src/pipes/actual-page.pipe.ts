import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actualPage'
})
export class ActualPagePipe implements PipeTransform {

  transform(urlPart: string): string {
    if(urlPart === 'characters'){
      return 'Apariciones en cómics y series'
    }else if(urlPart === 'events' || urlPart === 'series'){
      return 'Caracteres y cómics relacionados'
    }else if(urlPart === 'comics'){
      return 'Caracteres o series relacionados'
    }
    return '';
  }

}
