import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupbyPipe } from './group-by.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { PhoneNumberPipe } from './phoneNumber.pipe';
import { PreFixPipe } from './PreFix.pipe';
import { OrderByPipe } from './sortby.pipe';
import { SplitPipe } from './string-split.pipe';
import { CurrencyNamePipe } from './currencyName.pipe';

@NgModule({
  declarations: [
    EscapeHtmlPipe,
    PhoneNumberPipe,
    PreFixPipe,
    OrderByPipe,
    SplitPipe,
    GroupbyPipe
  ],
  imports: [
    
  ],
  providers: [
    EscapeHtmlPipe,
    PhoneNumberPipe,
    PreFixPipe,
    OrderByPipe,
    SplitPipe,
    DatePipe,
    GroupbyPipe
  ],
  exports: [
    EscapeHtmlPipe,
    PhoneNumberPipe,
    PreFixPipe,
    OrderByPipe,
    SplitPipe,
    GroupbyPipe
  ]

})
export class PipeModule {

}
