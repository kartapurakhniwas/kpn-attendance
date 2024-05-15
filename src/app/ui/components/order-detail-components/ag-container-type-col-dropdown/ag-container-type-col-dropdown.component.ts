import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MasterCallService } from '../../../../core/services/master-services/master-services.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ContainerService } from '../../../../core/services/container/container.service';


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
  clickBadge:boolean = true;
  containerTypeName:any = null;

  constructor(private master: MasterCallService, private container: ContainerService,){}

  agInit(params: any) {
    this.value = params.data;
    this.containerTypeName = this.value.containerTypeName;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  badgeClicked() {
    this.clickBadge = false;
    this.getAllTypes();
  }

  getAllTypes(){
    let self = this;
    self.master.GetContainerType().subscribe((m) => {
      if (m.success) {
        this.containerType = m.lstModel;
        this.typeSelected = this.value.containerTypeId;
      } 
    });
  }

  onCellValueChanged(event:any) {
    let payload = this.value;
    let self = this;
    this.containerTypeName = event.value.type;
    payload.containerTypeId = event.value.containerTypeId;
    payload.containerCheckDigit = Number(Number(payload?.containerCheckDigit));
    payload.tareWeight = Number(Number(payload?.tareWeight));
    payload.grossWeight = Number(Number(payload?.grossWeight));
    payload.weightUnitId = Number(Number(payload?.weightUnitId));
    payload.containerOwnerId = Number(Number(payload?.containerOwnerId));
    payload.temperature = Number(Number(payload?.temperature));
    payload.temperatureUnitId = Number(Number(payload?.temperatureUnitId));
    payload.orderId = Number(Number(payload?.orderId));
    payload.carrierId = Number(Number(payload?.carrierId));
    payload.statusId = Number(Number(payload?.statusId));

    
    self.container.updateContainer(payload).subscribe((m:any) => {
      if (m.success) {
        this.clickBadge = true;
      }
    });
  }
  
}
