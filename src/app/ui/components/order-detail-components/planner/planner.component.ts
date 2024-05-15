import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignContainerService } from '../../../../core/services/container-assignment/container-assignment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LocationsService } from '../../../../core/services/locations/locations.service';
import { ContainerPickdropLocationService } from '../../../../core/services/container-pickdrop-location/container-pickdrop-location.service';
import { ContainerLoadingUnloadingLocationService } from '../../../../core/services/ContainerLoadingUnLoadingLocation/Container-Loading-UnLoading-Location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FleetAPIService } from '../../../../core/services/fleetAPI/fleet-api.service';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationComponent } from '../../../../core/shared/widgets/popup/confirmation';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatSelectModule,MatInputModule, FormsModule, MatButtonModule
  ],
  selector: 'planner-component',
  templateUrl: 'planner.component.html'
})
export class PlannerComponent {
    @Input() selectedContainerId: any;
    @Input() containerLoadId: any;
    getPlannerList: any = [];
    finishFlag: boolean = false;
    unloadingLocations: any;
    pickupLocation: any = {name:'', id:0};
    dropLocation: any = {name:'', id:0};
    yardLocationsList: any;
    driverList: any;
    truckList: any;
    trailerList: any;
  plannerSaved: boolean = false;
  clickPickup: boolean = false;
  clickYard: boolean = false;
  clickUnloading: boolean = false;
  clickReturn: boolean = false;
  clickPickupLocation: boolean = false;
  clickUnloadingLocation: boolean = false;
  clickEmptyReturnLocation: boolean = false;
  unloadingLocationsCount: any;

    constructor(private assignContainer: AssignContainerService,private _srvLocationsService: LocationsService,
        private _srvContainerPickdropLocationService: ContainerPickdropLocationService,private _srvContainerLoadingUnloadingLocationService: ContainerLoadingUnloadingLocationService,
        private _snackBar: MatSnackBar,private fleetApi: FleetAPIService, private changeDetector: ChangeDetectorRef, private dialog: MatDialog
    ) {}

    // ngOnInit(){
    //     this.refresh();
    //     console.log("🚀 ~ PlannerComponent ~ ngOnInit ~ this.changeDetector:", this.changeDetector)
    // }

    ngOnChanges() {
      this.refresh();
    }

    refresh(){
        this.getPickLocationByContainerId(this.selectedContainerId);
        this.getunloadingLocationByContainerId(this.selectedContainerId);
        this.getDropLocationByContainerId(this.selectedContainerId);
        this.getYardLocations(4);
        this.getDriver();
        console.log('Planner');
        
    }

    getDriver() {
        let self = this;
        self.fleetApi.getAllDrivers().subscribe((m: any) => {
          if (m.respStatus) {
            this.driverList = m.lstModel;
              this.getTrucks();
          }
        });
      }
    
      getTrucks() {
        let self = this;
        self.fleetApi.getAllTruck().subscribe((m: any) => {
          if (m.respStatus) {
            // console.log("🚀 ~ ImportOrdersDetailComponent ~ self.fleetApi.getAllTruck ~ m:", m)
            this.truckList = m.lstModel;
              this.getTrailer();
          }
        });
      }
    
      getTrailer() {
        let self = this;
        self.fleetApi.getAllTrailer().subscribe((m: any) => {
          if (m.respStatus) {
            this.trailerList = m.lstModel;
            //   this.getBranchList();
            this.getPlanner();
          }
        });
      }

    getPickLocationByContainerId(containerId: number) {
        this._srvContainerPickdropLocationService.GetPickLocationByContainerId(containerId).subscribe({
          next: (response: any) => {
            console.log("🚀 ~ PlannerComponent ~ this._srvContainerPickdropLocationService.GetPickLocationByContainerId ~ response:", response)
            if (response.success && response.model != null) {
              this.getlocationById(response.model?.pickUpLocationId, "PickUp");
            } else {
              this.clickPickupLocation = true;
            }
          }
        });
      }
    
      getunloadingLocationByContainerId(containerId: number) {
        this._srvContainerLoadingUnloadingLocationService.GetLoadingUnLoadingLocationByContainerId(containerId).subscribe({
          next: (response: any) => {
            if(response.success && (response.lstModel.length > 0)) {
              this.unloadingLocations = response.lstModel;
              this.unloadingLocationsCount = this.unloadingLocations.length;
            } else {
              this.clickUnloadingLocation = true;
              this.unloadingLocationsCount = 0
            }
            // console.log("🚀 ~ ImportOrdersDetailComponent ~ this._srvContainerLoadingUnloadingLocationService.GetLoadingUnLoadingLocationByContainerId ~ this.unloadingLocations:", this.unloadingLocations)
          }
        });
      }
    
      getDropLocationByContainerId(containerId: number) {
        this._srvContainerPickdropLocationService.GetDropLocationByContainerId(containerId).subscribe({
          next: (response: any) => {
            if (response.success && (response.model != null)) {
              this.getlocationById(response.model.dropLocationId, 'DropLocation')
            } else {
              this.clickEmptyReturnLocation = true;
            }
          }
        });
      }
    
      getlocationById(id: any, locationtype: any, item?:any) {
        let self = this;
        self._srvLocationsService.getLocationById(id).subscribe((m: any) => {
          if (m.success) {
            if (locationtype == "PickUp") {
              console.log("🚀 ~ PlannerComponent ~ self._srvLocationsService.getLocationById ~ m.model:", m.model)
                this.pickupLocation.id = m.model.locationTypes[0].locationId;
                this.pickupLocation.name =   m.model.addressMappings[0].address.cityName + ', ' + m.model.addressMappings[0].address.stateName + ', ' + m.model.addressMappings[0].address.countryName + ', ' + m.model.addressMappings[0].address.postalCode;
            }
            if (locationtype == "UnloadingLocation") {
                item.unloadingLocationName =   m.model.addressMappings[0].address.cityName + ', ' + m.model.addressMappings[0].address.stateName + ', ' + m.model.addressMappings[0].address.countryName + ', ' + m.model.addressMappings[0].address.postalCode;
            }
            if (locationtype == "DropLocation") {
                this.dropLocation.id = m.model.locationTypes[0].locationId;
                this.dropLocation.name =   m.model.addressMappings[0].address.cityName + ', ' + m.model.addressMappings[0].address.stateName + ', ' + m.model.addressMappings[0].address.countryName + ', ' + m.model.addressMappings[0].address.postalCode;
            }
            if (locationtype == "Yard") {
                item.yardLocation.name =   m.model.addressMappings[0].address.cityName + ', ' + m.model.addressMappings[0].address.stateName + ', ' + m.model.addressMappings[0].address.countryName + ', ' + m.model.addressMappings[0].address.postalCode;
            }
          }
        });
      }
    
      getYardLocations(locationType:number) {
        this._srvLocationsService.getAllLocations(locationType).subscribe({
          next: (response: any) => {
            this.yardLocationsList = response.lstModel;
          }
        });
      }

    getPlanner() {
        let self = this;
        self.assignContainer.getContainerPlanns(this.selectedContainerId).subscribe((m: any) => {
          if (m.success) {
            this.getPlannerList = m.lstModel;
            if (this.getPlannerList.length>0) {
              this.finishFlag = true;
              this.plannerSaved = true;
            }
            this.getPlannerList.forEach((element:any) => {
              if(element.locationTypeId == 1) {
                this.clickPickup = true
              }
              if(element.locationTypeId == 4) {
                this.clickYard = true
              }
              if(element.locationTypeId == 6) {
                this.clickUnloading = true
              }
              if(element.locationTypeId == 3) {
                this.clickReturn = true
              }
            });
          }
        });
      }

    
  addLocaiton(type:number, eventID:number) {
    
    // Location type IDs
    // 1 pickup
    // 2 loading
    // 3 dropoff
    // 4 yard
    // 5 no location
    // 6 unloading

    // Event type IDs
    // 1 pickup
    // 2 loading
    // 3 unloading
    // 4 dropoff
    // 5 yard
    // 6 Out source
    // 7 Start
    // 8 Finish

    // let data = this.AssignmentForm.value; USE THIS
    let data:any = {};
    let location = {
      containerAssignmentPlannerId: 0,
      containerId: this.selectedContainerId,
      loadId: this.containerLoadId,
      // loadTypeId: data.containerLoad,
      loadTypeId: 1,
      statusId: data.statusId,
      assignedBy: 0,
      utcAssignedAt: new Date,
      eventId: eventID,
      driverId: 0,
      driverName: "string",
      driverPhone: "string",
      truckId: 0,
      truckName: "string",
      trailerId: 0,
      trailerName: "string",
      locationId: 0,
      locationTypeId: type,
      sequenceNumber: 0,
      isVisited: false,
      isActive: true
    }
    if(type == 1) {
      if(this.pickupLocation.id != 0) {
        this.clickPickupLocation = true;
        location.locationId = this.pickupLocation.id;
      } else {
        this.clickPickupLocation = true;
      }
    } else if (type == 3) {
      this.clickEmptyReturnLocation = true;
      this.clickPickupLocation = true;
      this.clickUnloadingLocation = true;
      location.locationId = this.dropLocation.id;
    } else if (type == 6) {
      this.clickPickupLocation = true;
      if(this.unloadingLocations.length > 0) {
        // this.unloadingLocations.splice(0,1);
        this.unloadingLocationsCount -= 1;
        if(this.unloadingLocationsCount == 0) {
          this.clickUnloadingLocation = true;
        }
      }
    }
    this.getPlannerList.push(location);
  }

  deleteLocation(index:any) {
    let obj = {'Desc': 'You want to Delete?'}
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 'OK') {
        this.getPlannerList.splice(index, 1)
      }
    });
  }

  savePlanner() {
    // console.log("🚀 ~ ImportOrdersDetailComponent ~ test ~ this.getPlannerList:", this.getPlannerList)
    // console.log("🚀 ~ ImportOrdersDetailComponent ~ test ~ this.gl.setRowData:", this.gl.setRowData)
    // this.finishFlag = true;
    this.getPlannerList.forEach((element:any, index:number) => {
      element.sequenceNumber = index + 1;
    });
    let self = this;
    self.assignContainer.SavePlanner(this.getPlannerList).subscribe((m: any) => {
      if (m.success) {
          this._snackBar.open('Saved Successfully', 'Okay', {
            duration: 3000,
          });
          this.getPlanner()
      }
    });
  }

  fastFarward(fromId:any, toId:any) {
    // console.log("🚀 ~ PlannerComponent ~ fastFarward ~ fromId:", fromId, toId)
    let self = this;
    self.assignContainer.fastFarward(fromId, toId).subscribe((m: any) => {
      if (m.success) {
          this._snackBar.open('Done Successfully', 'Okay', {
            duration: 3000,
          });
          this.getPlanner()
      }
    });
  }

    

}