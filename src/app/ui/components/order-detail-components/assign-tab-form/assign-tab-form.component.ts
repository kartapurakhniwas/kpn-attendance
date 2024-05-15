import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignContainerService } from '../../../../core/services/container-assignment/container-assignment.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalVariable } from '../../../../core/services/global.service';
import { ContainerService } from '../../../../core/services/container/container.service';
import { MatSelectModule } from '@angular/material/select';
import { MasterCallService } from '../../../../core/services/master-services/master-services.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule
  ],
  selector: 'assign-tab-form-component',
  templateUrl: 'assign-tab-form.component.html'
})
export class AssignTabFormComponent {
    @Input() selectedContainerId: any;
    historyLst: any;
    containerStatusList: any;
    containerLoadList: any;
    unitList: any = [];
    containerTypeList: any;

    constructor(private container: ContainerService, private assignContainer: AssignContainerService, private _snackBar: MatSnackBar, public gl: GlobalVariable,
        private master: MasterCallService,
    ) {}

    ngOnChanges() {
      this.GetContainerStatus();
    }

    GetContainerStatus() {
        let self = this;
        self.master.GetContainerStatus(0).subscribe((m:any) => {
            if (m.success) {
            this.containerStatusList = m.lstModel;
            this.GetContainerLoadStatus()
            }
        });
    }

    GetContainerLoadStatus() {
        let self = this;
        self.master.GetContainerLoadStatus().subscribe((m:any) => {
            if (m.success) {
            this.containerLoadList = m.lstModel;
            this.GetContainerType()
            }
        });
    }

    GetContainerType() {
        let self = this;
        self.master.GetContainerType().subscribe((m:any) => {
            if (m.success) {
            // console.log("🚀 ~ ImportOrdersDetailComponent ~ self.master.GetContainerType ~ m:", m)
            this.containerTypeList = m.lstModel;
            this.GetUnits()
            }
        });
    }

    GetUnits() {
        let self = this;
        self.master.GetUnits().subscribe((m:any) => {
            if (m.success) {
            m.lstModel.forEach((ele:any) => {ele.unitTypeId == 2 ? this.unitList.push(ele) : []});
            this.getContainersById(this.selectedContainerId);
            }
        });
    }

    getContainersById(id:any) {
        let self = this;
        self.container.getContainerById(id).subscribe((m:any) => {
            if (m.success) {
            this.setAssignmentValue(m.model);
            }
        });
    }

    AssignmentForm = new FormGroup({
        containerId: new FormControl(0),
        containerGuid: new FormControl("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
        containerNo: new FormControl(""),
        containerCheckDigit: new FormControl(0),
        containerTypeId: new FormControl(1),
        tareWeight: new FormControl(0),
        grossWeight: new FormControl(0),
        weightUnitId: new FormControl(0),
        containerOwnerId: new FormControl(0),
        temperature: new FormControl(0),
        temperatureUnitId: new FormControl(0),
        orderId: new FormControl(0),
        spotLane: new FormControl(""),
        portStatusId: new FormControl(0),
        sealNo: new FormControl(""),
        spotNo: new FormControl(""),
        statusId: new FormControl(0),
        createdBy: new FormControl(0),
        utcCreatedAt: new FormControl(new Date),
        modifiedBy: new FormControl(new Date),
        utcModifiedAt: new FormControl(new Date),
        isDeleted: new FormControl(false),
        deletedBy: new FormControl(0),
        utcDeletedAt: new FormControl(new Date),
        containerLoad: new FormControl([]),
        // planners: new FormControl([])
      });
    
      ContainerLoad = new FormGroup({
        containerLoadId: new FormControl(0),
        containerId: new FormControl(0),
        isTroubled: new FormControl(false),
        driverId: new FormControl(0),
        driverName: new FormControl(""),
        truckId: new FormControl(0),
        truckNo: new FormControl(""),
        chassisId: new FormControl(0),
        chassisNumber: new FormControl(""),
        containerLoadStatusId: new FormControl(0),
        isDeleted: new FormControl(false),
        deleteBy: new FormControl(0),
        utcDeletedAt: new FormControl(new Date),
        createdBy: new FormControl(0),
        utcCreatedAt: new FormControl(new Date),
        modifiedBy: new FormControl(0),
        utcModifiedAt: new FormControl(new Date),
      }) as any;

    setAssignmentValue(data:any) {
        console.log("🚀 ~ ImportOrdersDetailComponent ~ setAssignmentValue ~ data:", data)
        this.AssignmentForm.controls["containerId"].setValue(data?.containerId);
        this.AssignmentForm.controls["containerGuid"].setValue(data?.containerGuid);
        this.AssignmentForm.controls["containerNo"].setValue(data?.containerNo);
        this.AssignmentForm.controls["containerCheckDigit"].setValue(data?.containerCheckDigit);
        this.AssignmentForm.controls["containerTypeId"].setValue(data?.containerTypeId);
        this.AssignmentForm.controls["tareWeight"].setValue(data?.tareWeight);
        this.AssignmentForm.controls["grossWeight"].setValue(data?.grossWeight);
        this.AssignmentForm.controls["weightUnitId"].setValue(data?.weightUnitId);
        this.AssignmentForm.controls["containerOwnerId"].setValue(data?.containerOwnerId);
        this.AssignmentForm.controls["temperature"].setValue(data?.temperature);
        this.AssignmentForm.controls["temperatureUnitId"].setValue(data?.temperatureUnitId);
        this.AssignmentForm.controls["orderId"].setValue(data?.orderId);
        this.AssignmentForm.controls["spotLane"].setValue(data?.spotLane);
        this.AssignmentForm.controls["portStatusId"].setValue(data?.portStatusId);
        this.AssignmentForm.controls["sealNo"].setValue(data?.sealNo);
        this.AssignmentForm.controls["spotNo"].setValue(data?.spotNo);
        this.AssignmentForm.controls["statusId"].setValue(data?.statusId);
        this.AssignmentForm.controls["createdBy"].setValue(data?.createdBy);
        this.AssignmentForm.controls["utcCreatedAt"].setValue(data?.utcCreatedAt);
        this.AssignmentForm.controls["modifiedBy"].setValue(data?.modifiedBy);
        this.AssignmentForm.controls["utcModifiedAt"].setValue(data?.utcModifiedAt);
        this.AssignmentForm.controls["isDeleted"].setValue(data?.isDeleted);
        this.AssignmentForm.controls["deletedBy"].setValue(data?.deletedBy);
        this.AssignmentForm.controls["utcDeletedAt"].setValue(data?.utcDeletedAt);
    
        this.ContainerLoad.controls["containerLoadId"].setValue(data?.containerLoad.containerLoadId);
        this.ContainerLoad.controls["containerId"].setValue(data?.containerLoad.containerId);
        this.ContainerLoad.controls["isTroubled"].setValue(data?.containerLoad.isTroubled);
        this.ContainerLoad.controls["driverId"].setValue(data?.containerLoad.driverId);
        this.ContainerLoad.controls["driverName"].setValue(data?.containerLoad.driverName);
        this.ContainerLoad.controls["truckId"].setValue(data?.containerLoad.truckId);
        this.ContainerLoad.controls["truckNo"].setValue(data?.containerLoad.truckNo);
        this.ContainerLoad.controls["chassisId"].setValue(data?.containerLoad.chassisId);
        this.ContainerLoad.controls["chassisNumber"].setValue(data?.containerLoad.chassisNumber);
        this.ContainerLoad.controls["containerLoadStatusId"].setValue(data?.containerLoad.containerLoadStatusId);
        this.ContainerLoad.controls["isDeleted"].setValue(data?.containerLoad.isDeleted);
        this.ContainerLoad.controls["deleteBy"].setValue(data?.containerLoad.deleteBy);
        this.ContainerLoad.controls["utcDeletedAt"].setValue(data?.containerLoad.utcDeletedAt);
        this.ContainerLoad.controls["createdBy"].setValue(data?.containerLoad.createdBy);
        this.ContainerLoad.controls["utcCreatedAt"].setValue(data?.containerLoad.utcCreatedAt);
        this.ContainerLoad.controls["modifiedBy"].setValue(data?.containerLoad.modifiedBy);
        this.ContainerLoad.controls["utcModifiedAt"].setValue(data?.containerLoad.utcModifiedAt);
    
        // if (data?.planners.length > 0) {
        //   this.Planners.controls["containerAssignmentPlannerId"].setValue(data?.planners[0].containerAssignmentPlannerId);
        //   this.Planners.controls["containerId"].setValue(data?.planners[0].containerId);
        //   this.Planners.controls["loadId"].setValue(data?.planners[0].loadId);
        //   this.Planners.controls["statusId"].setValue(data?.planners[0].statusId);
        //   this.Planners.controls["assignedBy"].setValue(data?.planners[0].assignedBy);
        //   this.Planners.controls["utcAssignedAt"].setValue(data?.planners[0].utcAssignedAt);
        //   this.Planners.controls["eventId"].setValue(data?.planners[0].eventId);
        //   this.Planners.controls["driverId"].setValue(data?.planners[0].driverId);`
        //   this.Planners.controls["truckId"].setValue(data?.planners[0].truckId);
        //   this.Planners.controls["trailerId"].setValue(data?.planners[0].trailerId);
        //   this.Planners.controls["locationId"].setValue(data?.planners[0].locationId);
        //   this.Planners.controls["locationTypeId"].setValue(data?.planners[0].locationTypeId);
        //   this.Planners.controls["sequenceNumber"].setValue(data?.planners[0].sequenceNumber);
        //   this.Planners.controls["isVisited"].setValue(data?.planners[0].isVisited);
        //   this.Planners.controls["isActive"].setValue(data?.planners[0].isActive);
        // }
      }
    
      assignFormSave() {
          let data = JSON.parse(JSON.stringify(this.AssignmentForm.value));
          data.containerLoad = this.ContainerLoad.value;
          if (this.AssignmentForm.valid) {
            let self = this;
              self.assignContainer.UpdateContainerLoad(data).subscribe((m: any) => {
                if (m.success) {
                  // this.AssignmentForm.reset();
                  this._snackBar.open('Saved Successfully', 'Okay', {
                    duration: 3000,
                  });
                  
                }
              });
          } else {
            for (let i in this.AssignmentForm.controls) {
              // this.AssignmentForm.controls[i].markAsTouched();
            }
            this._snackBar.open('Please fill required fields', 'Okay', {
              duration: 3000,
            });
          }
      }

}