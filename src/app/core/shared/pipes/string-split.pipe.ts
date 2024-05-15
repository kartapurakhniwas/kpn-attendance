import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(val: string) {
    return val.slice(2);
  }
}