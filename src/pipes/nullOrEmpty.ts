import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullOrEmpty'
})
export class NullOrEmptyPipe implements PipeTransform {

  transform(value: any, section: boolean): string {
    const defaultValue: string = 'La descripción no se encuentra disponible';
    
    if(value === null || value === '' || value === '#N/A'){
      return defaultValue;
    }else if(section){
      return value;
    }else{
      return value.substring(0,150) + "...";
    }

  }

}
