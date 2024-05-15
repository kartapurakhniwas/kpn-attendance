import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  imports: [],
  selector: 'ag-online-component',
  template: `
    <i
      class="ki-duotone ki-cd table_icons"
      [class.online_icon]="value == true"
      [class.offline_icon]="value == false"
    >
      <span class="path1"></span>
      <span class="path2"></span>
    </i>
    @if(value) { Online } @else { Offline }
  `,
})
export class AgOnlineStatusComponent implements ICellRendererAngularComp {
  icon: string = '';
  value: any;

  agInit(params: any) {
    this.value = params.data.isActive;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
