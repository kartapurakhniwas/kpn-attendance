import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MasterCallService } from '../../../../core/services/master-services/master-services.service';
import { MatSelectModule } from '@angular/material/select';
import { Form, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContainerTrack } from '../../../../core/services/container-track/ContainerTrack.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule,MatSelectModule],
  selector: 'ag-container-type-col-dropdown.component',
  template: `
        @if(clickBadge){
    @if(containerTypeName != null) {
      <span (click)="badgeClicked()">{{containerTypeName}}</span>
    } @else {
      <span class="text-badge" (click)="badgeClicked()">Click to add</span>
    }
  } @else { 
    @if(this.containerType.length > 0) {
      <div class="d-flex align-items-center">
     
      <mat-form-field appearance="outline" >
        <mat-select placeholder="Container Type" [(ngModel)]="typeSelected" (selectionChange)="onCellValueChanged($event)">
          @for(type of containerType; track type.containerTypeId) {
            <mat-option [value]="type">{{type.type}}</mat-option>
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



export class ContinerTypeDropdownComponent implements ICellRendererAngularComp {
  value: any;
  containerType: any = [];
  typeSelected:any;
  Rowdata:any;
  clickBadge:boolean = true;
  containerTypeName:any = null;

  

  constructor(private master: MasterCallService, private _srvContainerTrack: ContainerTrack,private _snackBar: MatSnackBar,){}

  agInit(params: any) {
    //console.log(params,'params');
    this.value = params.data;
    // this.containerType=params.iterationObject.containerTypeList;
   // console.log(this.containerType,'this.containerType');
    this.typeSelected = this.value.containerTypeId;
    this.Rowdata=params;
    console.log("🚀 ~ ContinerTypeDropdownComponent ~ agInit ~ params:", params)
    this.value = params.data;
    this.containerTypeName = this.value.containerType;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  badgeClicked() {
    this.clickBadge = false;
    this.GetContainerType();
  }

  GetContainerType(){
    let self = this;
    self.master.GetContainerType().subscribe((m) => {
      if (m.success) {
        this.containerType = m.lstModel;
       this.typeSelected = this.value.containerTypeId;
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
    this.containerTypeName = event.value.type;
    
    let formData=self.submitForm.value;
     console.log(payload, "payload");
    // console.log(payload, "onCellValueChanged");
     if(this.Rowdata.column.colId=="containerTypeId")
     {
       formData.type="2";
       formData.data= JSON.stringify(event.value.containerTypeId);
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
