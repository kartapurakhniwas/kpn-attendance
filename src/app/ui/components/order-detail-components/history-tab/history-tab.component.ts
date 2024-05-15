import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignContainerService } from '../../../../core/services/container-assignment/container-assignment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../../../core/shared/widgets/popup/confirmation';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'history-tab-component',
  templateUrl: 'history-tab.component.html'
})
export class HistoryTabComponent {
    @Input() selectedContainerId: any;
    historyLst: any;

    constructor(private assignContainer: AssignContainerService, private _snackBar: MatSnackBar, private dialog: MatDialog) {}

    ngOnChanges() {
      this.refresh();
    }

    refresh(){
      this.getHistory(this.selectedContainerId);
      console.log('History');
    }

    getHistory(containerId: number) {
        this.assignContainer.GetHistory(containerId).subscribe({
        next: (response: any) => {
            this.historyLst = response.lstModel;
        }
        });
    }

    undoHistory(){
      let obj = {'Desc': 'You want to Delete all Auto Completed Steps ?'}
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '350px',
        data: obj
      });
      dialogRef.afterClosed().subscribe((result:any) => {
        if (result == 'OK') {
          let self = this;
          self.assignContainer.UndoHistory(this.selectedContainerId).subscribe((m: any) => {
            if (m.success) {
              this.historyLst = m.lstModel;
              this._snackBar.open('Done Successfully', 'Okay', {
                duration: 3000,
              });
            }
          });
        }
      });
      
    }

}