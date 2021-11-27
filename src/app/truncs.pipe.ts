import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncs'
})
export class TruncsPipe implements PipeTransform {

 transform(value: string, strsize: number = 240): string {
    if (value.length > strsize) { return value.substring(0, strsize) + "..."; }
    else { return value; }
  }

}
