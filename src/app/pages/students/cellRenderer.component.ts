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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../core/shared/widgets/popup/confirmation';
import { StudentsComponent } from './students.component';
import { StudentsService } from '../../core/services/students/students.service';


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
  storedValue: any;

  constructor(private students: StudentsComponent,private gl: GlobalVariable, private nav: Router,
     private _snackBar: MatSnackBar, private dialog: MatDialog, public srv: StudentsService
  ) {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.value = params;
    if(this.storedValue != null || undefined) {
      this.storedValue = "Value here";
    }
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    if(this.storedValue != null || undefined) {
      return true;
    } else {
      return false;
    }
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  edit() {
    this.gl.setRowData = this.value.data;
    this.students.addRowFlag = true;
    
    
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
            this.srv.deleteStudent(this.value.data.id).then((res) => {
              this._snackBar.open('Deleted Successfully!', 'Okay', {
                duration: 3000,
              });
              this.students.refresh();
            }).catch((err:any) => {
              
            })
          }
        });
      }

    //   delete() {
    //     this.srv.getStudents().then((res) => {
    //       this.getpaged = res;
    //     }).catch((err:any) => {
          
    //     })
    // }

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