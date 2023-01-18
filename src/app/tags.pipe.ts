import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split(", ").map(tag => "#" + tag).join(" ");
  }

}
