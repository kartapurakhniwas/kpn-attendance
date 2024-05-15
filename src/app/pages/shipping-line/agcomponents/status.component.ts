import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ShippingLineComponent } from '../shipping-line.component';


@Component({
  standalone: true,
  imports: [CommonModule,
    MatMenuModule, 
    MatButtonModule,MatIconModule,MatDialogModule,FormsModule, ReactiveFormsModule],
  selector: 'total-value-component',
  template: ` 
    <span class="text-badge green">
      Completed
    </span>
  `,
})
export class StatusComponent implements ICellRendererAngularComp {
  public cellValue!: string;

  constructor(public shippingLine: ShippingLineComponent) {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    // console.log(params, "params");
    
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

//   view() {
//     this.nav.navigateByUrl('/payment/view-receipt');
//   }

//   printCheque(): void {
//     const dialogRef = this.dialog.open(PrintChequePopup, {
//       width: '1070px'
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closedddd');
      
//     });
//   }

//   changeStatus(): void {
//     const dialogRef = this.dialog.open(UpdateStatusDialog, {
//       width: '570px'
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closedddd');
//       if (result == 'close') {
        
//       }
//     });
//   }

//   delete(): void {
//     console.log(this.gl.setRowData);
//     if (this.gl.setRowData) {
//       let obj = {'desc': 'You want to Delete "' + this.gl.setRowData.name + '"'}
//       const dialogRef = this.dialog.open(ConfirmationComponent, {
//         width: '350px',
//         data: obj
//       });
//       dialogRef.afterClosed().subscribe((result) => {
//         if (result == 'OK') {
//           const self = this;
//           self.srv.Delete(this.gl.setRowData.id).subscribe((m:any) => {
//             if (m) {
//             //   this.refresh();
//               this.gl.setRowData = null;
//               this.gl.setPaymentData = null;
//               this._snackBar.open("Deleted Successfully", "Okay", { 'duration': 3000 });
//             }
//           });
//         }
//       });
//     }
//   }

//   edit() {
//     this.nav.navigateByUrl('/payment/add');
//   }

}