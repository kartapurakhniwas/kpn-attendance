import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GlobalVariable } from '../../core/services/global.service';
import { ConfirmationComponent } from '../../core/shared/widgets/popup/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomersComponent } from './customers.component';
import { CustomerService } from '../../core/services/customer/customer.service';
// import { ShippingLineComponent } from './shipping-line.component';


@Component({
  standalone: true,
  imports: [CommonModule,
    MatMenuModule, 
    MatButtonModule,MatIconModule,MatDialogModule,FormsModule, ReactiveFormsModule],
  selector: 'total-value-component',
  template: ` 
    <button [matMenuTriggerFor]="menu" mat-icon-button class="action-btn">
        <!-- <mat-icon>more_vert</mat-icon> -->
        <i class="ki-duotone ki-dots-vertical">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          </i>
    </button>
    <mat-menu #menu="matMenu" xPosition="after" class="list-pb-0">
      <button mat-menu-item (click)="edit()">Edit</button>
      <button mat-menu-item (click)="delete()">Delete</button>
    </mat-menu>
  `,
})
export class TotalValueRendererMenu implements ICellRendererAngularComp {
  public cellValue!: string;
  value: any;

  constructor(private nav: Router, private gl: GlobalVariable, private customer: CustomerService, private dialog: MatDialog,
    private _snackBar:MatSnackBar, private customerComponent: CustomersComponent
  ) {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    // console.log(params, "params");
    this.value = params.data
    
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

  edit() {
    this.nav.navigateByUrl('/customers/add');
    this.gl.setRowData = this.value;
  }
  
  delete() {
  console.log(this.value, "this.value");
  
      let obj = {'Desc': 'You want to Delete?'}
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '350px',
        data: obj
      });
      dialogRef.afterClosed().subscribe((result:any) => {
        if (result == 'OK') {
          const self = this;
          self.customer.Delete(this.value.id).subscribe((m:any) => {
            if (m.success) {
              this.customerComponent.refresh();
              this._snackBar.open("Deleted Successfully", "Okay", { 'duration': 3000 });
            }
          });
        }
      });
    }


}