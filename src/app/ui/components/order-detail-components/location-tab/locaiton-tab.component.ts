import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContainerLoadingUnloadingLocationService } from '../../../../core/services/ContainerLoadingUnLoadingLocation/Container-Loading-UnLoading-Location.service';
import { AssignContainerService } from '../../../../core/services/container-assignment/container-assignment.service';
import { ContainerPickdropLocationService } from '../../../../core/services/container-pickdrop-location/container-pickdrop-location.service';
import { LocationsService } from '../../../../core/services/locations/locations.service';
import { GlobalVariable } from '../../../../core/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, ReactiveFormsModule, MatSelectModule,
    MatButtonModule, MatMenuModule, CommonModule, MatInputModule, FormsModule, MatCheckboxModule
  ],
  selector: 'location-tab-component',
  templateUrl: 'location-tab.component.html'
})
export class LocationTabComponent {
  @Input() selectedContainerId: any;
  @Input() selectedOrderId: any;
  paramsValue: any;
  pickupLocations: any;
  emptyLocations: any;
  unloadingLocations: any;
  loadingUnloadingLocations: any;
  pickupLocationName: any;
  emptyLocationName: any;
  unloadingLocationName: any;
  orderId: any;
  containerId: any;
  isunloadingEdit: boolean = false;

  constructor(
    private _srvLocationsService: LocationsService, private _srvContainerPickdropLocationService: ContainerPickdropLocationService
    , private _srvContainerLoadingUnloadingLocationService: ContainerLoadingUnloadingLocationService, private _srvAssignContainerService: AssignContainerService,
    public gl: GlobalVariable,private _snackBar: MatSnackBar,
  ) {}

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.containerId = this.selectedContainerId;
    this.orderId = this.selectedOrderId;
    console.log("🚀 ~ LocationTabComponent ~ refresh ~ this.containerId:", this.containerId)
    this.getLocations(1);
    this.getEmptyLocations(3);
    this.getUnloadingLocations(6);

    this.getPickLocationByContainerId(this.containerId);
    this.getDropLocationByContainerId(this.containerId);
    this.getunloadingLocationByContainerId(this.containerId);
  }

  
  exportLocationForm = new FormGroup({
    containerPickLocationId: new FormControl(0),
    containerPickLocationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    orderId: new FormControl(0),
    containerId: new FormControl(0),
    legTypeId: new FormControl(0),
    pickUpLocationId: new FormControl(null as any, [Validators.required]),
    pickUpFromDateTime: new FormControl(null as any, [Validators.required]),
    pickUpToDateTime: new FormControl(null as any, [Validators.required]),
    pickUpReservationNo: new FormControl(null as any, [Validators.required]),
    pickUpTVAId: new FormControl(null as any, [Validators.required]),
    pickUpReservationFromDateTime: new FormControl(null as any, [Validators.required]),
    pickUpReservationToDateTime: new FormControl(null as any, [Validators.required]),
    pickUpReservationComments: new FormControl(),
    pickUpReservationDateTime: new FormControl(null as any, [Validators.required]),
    addressTypeId: new FormControl(1)
  }) as any;

  dropLocationForm = new FormGroup({
    containerDropLocationId: new FormControl(0),
    containerDropLocationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    orderId: new FormControl(0),
    containerId: new FormControl(0),
    legTypeId: new FormControl(0),
    dropLocationId: new FormControl(null as any, [Validators.required]),
    dropOffFromDateTime: new FormControl(null as any, [Validators.required]),
    dropOffToDateTime: new FormControl(null as any, [Validators.required]),
    dropOffReservationNo: new FormControl(null as any, [Validators.required]),
    dropOffTVAId: new FormControl(null as any, [Validators.required]),
    dropOffReservationFromDateTime: new FormControl(null as any, [Validators.required]),
    dropOffReservationToDateTime: new FormControl(null as any, [Validators.required]),
    dropOffReservationComments: new FormControl("Empty"),
    dropOffReservationDateTime: new FormControl(null as any, [Validators.required]),
    addressTypeId: new FormControl(1)
  }) as any;

  unloadlocationForm = new FormGroup({
    containerId: new FormControl(0),
    containerLoadingUnLoadingLocationId: new FormControl(0),
    containerLoadingUnLoadingLocationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    locationId: new FormControl(null as any, [Validators.required]),
    loadingUnLoadingDate: new FormControl(null as any, [Validators.required]),
    purchaseOrderNumber: new FormControl(null as any, [Validators.required]),
    isInspectionRequired: new FormControl(false),
    sequenceNo: new FormControl(0),
    isDeleted: new FormControl(false),
    deletedBy: new FormControl(0),
    remarks: new FormControl()
  }) as any;

  getLocations(locationType: number) {
    this._srvLocationsService.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        if(response.success) {
          this.pickupLocations = response.lstModel;
        }
      },
      error: (err: any) => {

      }
    });
  }

  getEmptyLocations(locationType: number) {
    this._srvLocationsService.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        if(response.success) {
          this.emptyLocations = response.lstModel;
        }
      },
      error: (err: any) => {

      }
    });
  }

  getUnloadingLocations(locationType: number) {
    this._srvLocationsService.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        if(response.success) {
          if(response.lstModel.length > 0) {
            this.unloadingLocations = response.lstModel;
          }
        }
      },
      error: (err: any) => {

      }
    });
  }

  getPickLocationByContainerId(containerId: number) {
    this._srvContainerPickdropLocationService.GetPickLocationByContainerId(containerId).subscribe({
      next: (response: any) => {
        if(response.success) {
          if (response.model != null) {
            this.setpickupLocationformvalue(response.model);
          }
        }
      },
      error: (err: any) => {

      }
    });
  }

  getDropLocationByContainerId(containerId: number) {
    this._srvContainerPickdropLocationService.GetDropLocationByContainerId(containerId).subscribe({
      next: (response: any) => {
        if(response.success) {
          if (response.model != null) {
            this.setemptyLocationformvalue(response.model);
          }
        }
      },
      error: (err: any) => {

      }
    });
  }

  getunloadingLocationByContainerId(containerId: number) {
    this._srvContainerLoadingUnloadingLocationService.GetLoadingUnLoadingLocationByContainerId(containerId).subscribe({
      next: (response: any) => {
        if(response.success) {
          this.loadingUnloadingLocations = response.lstModel;
        }
      },
      error: (err: any) => {

      }
    });
  }

  setpickupLocationformvalue(model: any) {
    this.exportLocationForm.controls["orderId"].setValue(model?.orderId);
    this.exportLocationForm.controls["addressTypeId"].setValue(model?.addressTypeId);
    this.exportLocationForm.controls["pickUpReservationDateTime"].setValue(model?.pickUpReservationDateTime);
    this.exportLocationForm.controls["pickUpReservationComments"].setValue(model?.pickUpReservationComments);
    this.exportLocationForm.controls["pickUpReservationToDateTime"].setValue(this.gl.dateToTimeString(model?.pickUpReservationToDateTime));
    this.exportLocationForm.controls["pickUpReservationFromDateTime"].setValue(this.gl.dateToTimeString(model?.pickUpReservationFromDateTime));
    this.exportLocationForm.controls["pickUpTVAId"].setValue(model?.pickUpTVAId);
    this.exportLocationForm.controls["pickUpReservationNo"].setValue(model?.pickUpReservationNo);
    this.exportLocationForm.controls["pickUpToDateTime"].setValue(model?.pickUpToDateTime);
    this.exportLocationForm.controls["pickUpFromDateTime"].setValue(model?.pickUpFromDateTime);
    this.exportLocationForm.controls["pickUpLocationId"].setValue(model?.pickUpLocationId);
    this.exportLocationForm.controls["legTypeId"].setValue(model?.legTypeId);
    this.exportLocationForm.controls["containerId"].setValue(model?.containerId);
    this.exportLocationForm.controls["containerPickLocationGuid"].setValue(model?.containerPickLocationGuid);
    this.exportLocationForm.controls["containerPickLocationId"].setValue(model?.containerPickLocationId);
    this.getlocationById(model?.pickUpLocationId, "PickUp");
    // console.log("🚀 ~ LocationTabComponent ~ setpickupLocationformvalue ~ model?.pickUpLocationId:", model?.pickUpLocationId)
  }

  setemptyLocationformvalue(model: any) {
    this.dropLocationForm.controls["orderId"].setValue(model?.orderId);
    this.dropLocationForm.controls["addressTypeId"].setValue(model?.addressTypeId);
    this.dropLocationForm.controls["dropOffReservationDateTime"].setValue(model?.dropOffReservationDateTime);
    this.dropLocationForm.controls["dropOffReservationComments"].setValue(model?.dropOffReservationComments);
    this.dropLocationForm.controls["dropOffReservationToDateTime"].setValue(this.gl.dateToTimeString(model?.dropOffReservationToDateTime));
    this.dropLocationForm.controls["dropOffReservationFromDateTime"].setValue(this.gl.dateToTimeString(model?.dropOffReservationFromDateTime));
    this.dropLocationForm.controls["dropOffTVAId"].setValue(model?.dropOffTVAId);
    this.dropLocationForm.controls["dropOffReservationNo"].setValue(model?.dropOffReservationNo);
    this.dropLocationForm.controls["dropOffToDateTime"].setValue(model?.dropOffToDateTime);
    this.dropLocationForm.controls["dropOffFromDateTime"].setValue(model?.dropOffFromDateTime);
    this.dropLocationForm.controls["dropLocationId"].setValue(model?.dropLocationId);
    this.dropLocationForm.controls["legTypeId"].setValue(model?.legTypeId);
    this.dropLocationForm.controls["containerId"].setValue(model?.containerId);
    this.dropLocationForm.controls["containerDropLocationGuid"].setValue(model?.containerDropLocationGuid);
    this.dropLocationForm.controls["containerDropLocationId"].setValue(model?.containerDropLocationId);
    this.getlocationById(model?.dropLocationId, "Empty");
    // console.log("🚀 ~ LocationTabComponent ~ setemptyLocationformvalue ~ model?.dropLocationId:", model?.dropLocationId)
  }


  pickuplocationChange(event: any) {
    this.getlocationById(event.value, "PickUp");

  }



  droplocationChange(event: any) {
    this.getlocationById(event.value, "Empty");

  }

  umloadinglocationChange(event: any) {
    this.getlocationById(event.value, "Unloading");

  }

  getlocationById(data: any, locationtype: any) {
    let self = this;
    self._srvLocationsService.getLocationById(data).subscribe((m: any) => {
      if (m.success) {
        if (locationtype == "PickUp") {
          this.pickupLocationName = m.model;
        }
        else if (locationtype == "Empty") {

          this.emptyLocationName = m.model;
        }
        else if (locationtype == "Unloading") {

          this.unloadingLocationName = m.model;
        }
      }
    });
  }

  SavePickUpLocation() {
    var formdata = this.exportLocationForm.value;
    formdata.orderId = this.selectedOrderId;
    formdata.containerId = this.selectedContainerId;
    // formdata.legTypeId = this.Form.legType;
    formdata.pickUpReservationFromDateTime = this.gl.timeToDateTime(formdata.pickUpReservationFromDateTime);
    formdata.pickUpReservationToDateTime = this.gl.timeToDateTime(formdata.pickUpReservationToDateTime);
    console.log(formdata);
    if (this.exportLocationForm.valid) {
      console.log("🚀 ~ LocationTabComponent ~ SavePickUpLocation ~ this.exportLocationForm.valid:", this.exportLocationForm.valid)
      this._srvContainerPickdropLocationService.UpdatePickLocation(formdata).subscribe((m: any) => {
        if (m.success) {
          this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
        } else {
          this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
        }
      });
    } else {
      for (let i in this.exportLocationForm.controls) {
        this.exportLocationForm.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill all required fields!", "Okay", { 'duration': 3000 });
    }

  }

  SaveEmptyUpLocation() {
    var formdata = this.dropLocationForm.value;
    formdata.orderId = this.orderId;
    formdata.containerId = this.containerId;
    // formdata.legTypeId = this.Form.legType;
    formdata.dropOffReservationFromDateTime = this.gl.timeToDateTime(formdata.dropOffReservationFromDateTime);
    formdata.dropOffReservationToDateTime = this.gl.timeToDateTime(formdata.dropOffReservationToDateTime);
    console.log(formdata);
    if(this.dropLocationForm.valid) {
      this._srvContainerPickdropLocationService.UpdateDropLocation(formdata).subscribe((m: any) => {
        if (m.success) {
          this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
        } else {
          this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
        }
      });
    } else {
      console.log("adsf asdf asdf ");
      
      for (let i in this.dropLocationForm.controls) {
        this.dropLocationForm.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill all required fields!", "Okay", { 'duration': 3000 });
    }

  }

  SaveunloadingUpLocation() {
    var formdata = this.unloadlocationForm.value;
    formdata.containerId = this.containerId;
    if(this.unloadlocationForm.valid) {
      this._srvContainerLoadingUnloadingLocationService.CreateLoadingUnLoadingLocation(formdata).subscribe((m: any) => {
        if (m.success) {
          this.unloadlocationForm.reset();
          this.getunloadingLocationByContainerId(this.containerId);
          this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
        } else {
          this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
        }
      });
    }else {
      console.log("adsf asdf asdf ");
      for (let i in this.unloadlocationForm.controls) {
        this.unloadlocationForm.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill all required fields!", "Okay", { 'duration': 3000 });
    }

  }

  deleteunloadingLocation(data: any) {

    this._srvContainerLoadingUnloadingLocationService.DeleteLoadingUnLoadingLocation(data.containerLoadingUnLoadingLocationId).subscribe((m: any) => {
      if (m.success) {
        this.getunloadingLocationByContainerId(data.containerId);
        this._snackBar.open("Delete Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });
  }

  editunloadingLocation(data: any) {
    console.log(data);
    this.isunloadingEdit = true;
    this.getlocationById(data?.locationId, "Unloading");
    //this.getUnloadingLocations(2);

    this.unloadlocationForm.controls["containerId"].setValue(data?.containerId);
    this.unloadlocationForm.controls["locationId"].setValue(data?.locationId);
    this.unloadlocationForm.controls["loadingUnLoadingDate"].setValue(data?.loadingUnLoadingDate);
    this.unloadlocationForm.controls["purchaseOrderNumber"].setValue(data?.purchaseOrderNumber);
    this.unloadlocationForm.controls["remarks"].setValue(data?.remarks);
    this.unloadlocationForm.controls["isInspectionRequired"].setValue(data?.isInspectionRequired);
    this.unloadlocationForm.controls["sequenceNo"].setValue(data?.sequenceNo);
    this.unloadlocationForm.controls["containerLoadingUnLoadingLocationId"].setValue(data?.containerLoadingUnLoadingLocationId);
    this.unloadlocationForm.controls["containerLoadingUnLoadingLocationGuid"].setValue(data?.containerLoadingUnLoadingLocationGuid);
    this.unloadlocationForm.controls["isDeleted"].setValue(data?.isDeleted);

  }

  UpdateunloadingUpLocation() {
    var formdata = this.unloadlocationForm.value;
    formdata.containerId = this.containerId;

    this._srvContainerLoadingUnloadingLocationService.updateLoadingUnLoadingLocation(formdata).subscribe((m: any) => {
     
      if (m.success) {
        this.isunloadingEdit = false;
        this.getunloadingLocationByContainerId(this.containerId);
        this.unloadlocationForm.reset();
        this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });

  }
}
