import { Pipe, PipeTransform } from "@angular/core";
// import { iterator } from "rxjs/internal-compatibility";

@Pipe({
  name: 'prefix'
})
export class PreFixPipe implements PipeTransform {
  transform(val: string, char: string, totalChar: number) {

    let differ = totalChar - val.length ;
    if (differ > 0) {
      let s = "";
      while (s.length < differ) {
        s = char + s;
      }
      return s + val;;
    }
    else {
      return val;
    }
  }
}