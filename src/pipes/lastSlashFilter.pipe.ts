import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'lastSlash'
})
export class lastSlashFilter implements PipeTransform {
    transform(value: string): boolean {
        const parts = value.split("/");

        if(parts[parts.length - 1] === 'image_not_available'){
            return false;
        }else{
            return true;
        }
    }
    
}