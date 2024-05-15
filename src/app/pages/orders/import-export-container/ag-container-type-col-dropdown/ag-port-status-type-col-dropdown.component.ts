import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MasterCallService } from '../../../../core/services/master-services/master-services.service';
import { MatSelectModule } from '@angular/material/select';
import { Form, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContainerTrack } from '../../../../core/services/container-track/ContainerTrack.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,MatSelectModule, MatTooltipModule],
  selector: 'ag-container-type-col-dropdown.component',
  template: `
       

        @if(clickBadge){
    @if(portStatusCode != null) {
      <span (click)="badgeClicked()" [matTooltip]="portStatusName">{{portStatusCode}}</span>
    } @else {
      <span class="text-badge" (click)="badgeClicked()">Click to add</span>
    }
  } @else { 
    @if(this.portStatusList.length > 0) {
      <div class="d-flex align-items-center">
     
      <mat-form-field appearance="outline" >
          <mat-select placeholder="Port Status" [(ngModel)]="typeSelected" (selectionChange)="onCellValueChanged($event)">
            @for(type of portStatusList; track type.id) {
              <mat-option [value]="type">{{type.portStatusText}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      <i class="ki-duotone ki-cross cursor-pointer" style="font-size: 21px" (click)="clickBadge = true">
                <span class="path1"></span>
                <span class="path2"></span>
                </i>
      </div>
    }
  }
  `
})



export class PortStatusTypeDropdownComponent implements ICellRendererAngularComp {
  value: any;
  portStatusList: any = [];
  typeSelected:any;
  Rowdata:any;
  clickBadge:boolean = true;
  portStatusName:any = null;
  portStatusCode: any = null;

  

  constructor(private master: MasterCallService, private _srvContainerTrack: ContainerTrack,private _snackBar: MatSnackBar,){}

  agInit(params: any) {
    this.value = params.data;
   // console.log(params.data,'params.data');
  //  this.portStatusList=params.iterationObject.portStatusList;
    this.Rowdata=params;
    this.typeSelected = this.value.portStatusId;
    this.portStatusName = this.value.portStatusText;
    this.portStatusCode = this.value.portStatusCode;
    
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  badgeClicked() {
    this.clickBadge = false;
    this.GetPortStatus();
  }

GetPortStatus() {
    let self = this;
    self.master.GetPortStatus().subscribe((m: any) => {
      if (m.success) {
        this.portStatusList = m.lstModel;
        this.typeSelected = this.value.portStatusId;
      }
    });
  }



  submitForm = new FormGroup({
    type: new FormControl(""),
    data: new FormControl(0),
    containerGuids: new FormControl(''),
  }) as any;

  onCellValueChanged(event:any) {
    let payload = this.value;
    let self = this;
    this.portStatusCode = event.value.portStatusCode;
    this.portStatusName = event.value.portStatusText;
    let formData=self.submitForm.value;
   //  console.log(payload, "payload");
    // console.log(payload, "onCellValueChanged");
     if(this.Rowdata.column.colId=="portStatusId")
     {
       formData.type="6";
       formData.data= JSON.stringify(event.value);
       formData.containerGuids=payload.containerGuid;
         
     }

     console.log(formData, "formData");
     this._srvContainerTrack.UpdateContainerInfo(formData).subscribe((m: any) => {
      if (m.success) {
        this.clickBadge = true;
        this._snackBar.open("Cell Updated Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }
  
}
