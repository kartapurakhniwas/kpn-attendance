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
  selector: 'ag-status-component',
  template: `<span class="text-badge" 
              [class.blue]="value == 1" 
              [class.orange]="value == 2" 
              [class.green]="value == 3" 
              [class.red]="value == 4">
                @switch (value) {
                  @case (1) {
                    New
                  }
                  @case (2) {
                    In Progress
                  }
                  @case (3) {
                    Delivered
                  }
                  @case (4) {
                    Cancelled
                  }
                  @default {
                    Something went wrong!
                  }
                }
            </span>
  `,
})

export class AgStatusComponent implements ICellRendererAngularComp {
  
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
    this.value = params.data.status;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  
}