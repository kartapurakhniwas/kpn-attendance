import { Pipe, PipeTransform } from "@angular/core";
// import { CurrencyService } from "src/app/services/currency.service";

@Pipe({
  name: 'currencyName'
})
export class CurrencyNamePipe implements PipeTransform {
  constructor(
    // private currency: CurrencyService
  ){}

  transform(val: any) {
    let self = this;
    let a = '-';
    let flag = false;
    // self.currency.GetById(val).subscribe((m:any) => {
    //   console.log(m.name);
    //   a = m.name
    //   flag = true;
    // });
    return flag ? a : '00'
  }
  
}