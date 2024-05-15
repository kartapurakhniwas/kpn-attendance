import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MasterCallService } from '../../../core/services/master-services/master-services.service';
import { CommonModule } from '@angular/common';
import { GlobalVariable } from '../../../core/services/global.service';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'isActive-component',
  template: `<span class="text-badge"
              [class.green]="value == true" 
              [class.red]="value == false">
                @switch (value) {
                  @case (true) {
                    Active
                  }
                  @case (false) {
                    In Active
                  }
                  @default {
                    Something went wrong!
                  }
                }
            </span>
  `,
})

export class isActiveComponent implements ICellRendererAngularComp {
  
  constructor(private master: MasterCallService, private gl: GlobalVariable) {}

  List:any = [];
  value: any = {};

  agInit(params: any) {
    // let self = this;
    // if (this.gl.StatusList.length == 0) {
    //   self.master.GetOrderStatus().subscribe((m:any) => {
    //     if (m.success) {
    //       this.gl.StatusList = m.lstModel;
    //       m.lstModel.filter((h:any) => {
    //         if (h.orderStatusID == params.data.status) {
    //           this.value = h;
    //         }
    //       })
    //     }
    //   });
    // } else {
    //   this.gl.StatusList.filter((h:any) => {
    //     if (h.orderStatusID == params.data.status) {
    //       this.value = h;
    //     } else {
    //       this.value = {"name": "Something went wrong!"};
    //     }
    //   })
    // }
    this.value = params.data.isActive;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  
}