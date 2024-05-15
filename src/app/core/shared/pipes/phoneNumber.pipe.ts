import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'numberPipe'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(val: string, arg: string) {
    if (arg) {
      return arg + val;
    } else {
      return val;
    }
  }
}