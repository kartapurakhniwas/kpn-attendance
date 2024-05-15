import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TotalValueRendererMenu } from './cellRenderer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalVariable } from '../../core/services/global.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterCallService } from '../../core/services/master-services/master-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LocationsService } from '../../core/services/locations/locations.service';



@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AgGridModule, MatMenuModule, MatExpansionModule,
    MatButtonModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, RouterModule,
    MatTooltipModule, MatSlideToggleModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './add-locations.component.html'
})
export class AddLocationsComponent {
  detailFlag: boolean = true; // should be false
  columnDefs: any;
  rowSelection: any;
  defaultColDef: any;
  isfilter: boolean = true;
  gridApi: any;
  gidColumnApi: any;
  getpaged: any;
  gridOptions: any;
  sidebarFlag: boolean = false;
  gridColumnApi: any;
  countries: any;
  states: any;
  cities: any;
  rateZoneList: any;
  locationTypesList: any;

  constructor(public gl: GlobalVariable, private master: MasterCallService, private _snackBar: MatSnackBar,
    private srv: LocationsService, private nav: Router) {

  
  }

  ngOnInit(): void {
    this.refresh();  
    if (this.gl.setRowData) {
      this.countryChange({value: this.gl.setRowData.addressMappings[0].address.countryId});
    }
    
  }

  refresh() {
    this.getLocationTypes()
  }

  getLocationTypes() {
    let self = this;
      self.master.getLocationTypes().subscribe((m) => {
        if (m.success) {
          this.locationTypesList = m.lstModel;
          this.getRateZone();
        } 
      });
  }

  getRateZone() {
    let self = this;
      self.master.getRateZoneMaster().subscribe((m) => {
        if (m.respStatus) {
          this.rateZoneList = m.lstModel;
          this.getCountries();
        } 
      });
  }

  getCountries() {
    let self = this;
      self.master.getAllCountries().subscribe((m) => {
        if (m.respStatus) {
          this.countries = m.lstModel;
          this.getIssueStates(1);
        } 
      });
  }

  getIssueStates(event:any) {
    let self = this;
    self.master.getStateWithCountry(event).subscribe((m:any) => {
      if (m.respStatus) {
        this.states = m.lstModel;
      }
    });
  }

  countryChange(event:any) {
    let self = this;
    self.master.getStateWithCountry(event.value).subscribe((m:any) => {
      if (m.respStatus) {
        this.states = m.lstModel;
        if (this.gl.setRowData) {
          this.stateChange({value: this.gl.setRowData.addressMappings[0].address.stateId});
        }
      }
    });
  }

  stateChange(event:any) {
    let self = this;
    self.master.getCityWithState(event.value).subscribe((m:any) => {
      if (m.respStatus) {
        this.cities = m.lstModel;
        if (this.gl.setRowData) {
          this.getById(this.gl.setRowData)
        }
      }
    });
  }

  getById(data:any) {
    let self = this;
    self.srv.getLocationById(data.id).subscribe((m:any) => {
      if (m.success) {
        this.setValue(m.model);
      }
    });
  }

  Form = new FormGroup({
    id: new FormControl(0),
    locationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    companyId: new FormControl(0),
    name: new FormControl('', Validators.required),
    rateZoneId: new FormControl(0),
    isActive: new FormControl(true),
    isDeleted: new FormControl(false),
    deletedBy: new FormControl(0),
    modifiedBy: new FormControl(0),
    createdBy: new FormControl(0),
    utcDeletedAt: new FormControl(new Date),
    utcModifiedAt: new FormControl(new Date),
    utcCreatedAt: new FormControl(new Date),
    addressMappings: new FormControl([]),
    locationTypes: new FormControl([]),
  }) as any;

  addressMappings = new FormGroup({
    locationId: new FormControl(0),
    addressId: new FormControl(1),
    address: new FormControl({})
  }) as any;

  address = new FormGroup({
    addressId: new FormControl(0),
    addressGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    addressTitle: new FormControl('', Validators.required),
    streetLine1: new FormControl(''),
    streetLine2: new FormControl(''),
    cityId: new FormControl(null, Validators.required),
    cityName: new FormControl(''),
    stateId: new FormControl(null, Validators.required),
    stateName: new FormControl(''),
    postalCode: new FormControl('', Validators.required),
    countryId: new FormControl(1, Validators.required),
    countryName: new FormControl(''),
    companyId: new FormControl(0),
    rateZoneId: new FormControl(null, Validators.required),
    latitude: new FormControl(0),
    longitude: new FormControl(0),
    utcCreatedAt: new FormControl(new Date),
    createdBy: new FormControl(0),
    utcModifiedAt: new FormControl(new Date),
    modifiedBy: new FormControl(0),
    isActive: new FormControl(true),
    timeZoneId: new FormControl(1),
    addressTypes: new FormControl([]),
    contactPerson: new FormControl([]),
    
  }) as any;

  addressTypes = new FormGroup({
    addressId: new FormControl(0),
    addressTypeId: new FormControl(1)
  }) as any;

  contactPerson = new FormGroup({
    contactPersonId: new FormControl(0),
    addressId: new FormControl(0),
    name: new FormControl(''),
    phone: new FormControl('', Validators.required),
    fax: new FormControl(''),
    emailMapping: new FormControl([]),
  }) as any;

  emailMapping = new FormGroup({
    contactPersonId: new FormControl(0),
    addressId: new FormControl(0), 
    emailTypeId: new FormControl(1),
    email: new FormControl('', Validators.required),
  }) as any;

  locationTypes = new FormGroup({
    locationId: new FormControl(0),
    locationTypeId: new FormControl(null, Validators.required),
    locationTypeName: new FormControl(""),
  }) as any;

  setValue(data:any) {
    console.log("🚀 ~ AddLocationsComponent ~ setValue ~ data:", data)
    this.Form.controls["id"].setValue(data?.id);
    this.Form.controls["locationGuid"].setValue(data?.locationGuid);
    this.Form.controls["companyId"].setValue(data?.companyId);
    this.Form.controls["name"].setValue(data?.name);
    // this.Form.controls["locationTypeId"].setValue(data?.locationTypeId);
    
    // this.Form.controls["rateZoneId"].setValue(data?.rateZoneId);
    this.Form.controls["isActive"].setValue(data?.isActive);
    this.Form.controls["isDeleted"].setValue(data?.isDeleted);
    this.Form.controls["deletedBy"].setValue(data?.deletedBy);
    this.Form.controls["utcDeletedAt"].setValue(new Date());
    this.Form.controls["modifiedBy"].setValue(data?.modifiedBy);
    this.Form.controls["utcModifiedAt"].setValue(new Date());
    this.Form.controls["createdBy"].setValue(data?.createdBy);
    this.Form.controls["utcCreatedAt"].setValue(new Date());

    this.addressMappings.controls["locationId"].setValue(data?.addressMappings[0].locationId);
    this.addressMappings.controls["addressId"].setValue(data?.addressMappings[0].addressId);
    
    this.address.controls["addressId"].setValue(data?.addressMappings[0].address.addressId);
    this.address.controls["addressGuid"].setValue(data?.addressMappings[0].address.addressGuid);
    this.address.controls["addressTitle"].setValue(data?.addressMappings[0].address.addressTitle);
    this.address.controls["streetLine1"].setValue(data?.addressMappings[0].address.streetLine1);
    this.address.controls["streetLine2"].setValue(data?.addressMappings[0].address.streetLine2);
    this.address.controls["cityId"].setValue(data?.addressMappings[0].address.cityId);
    this.address.controls["cityName"].setValue(data?.addressMappings[0].address.cityName);
    this.address.controls["stateId"].setValue(data?.addressMappings[0].address.stateId);
    this.address.controls["stateName"].setValue(data?.addressMappings[0].address.stateName);
    this.address.controls["postalCode"].setValue(data?.addressMappings[0].address.postalCode);
    this.address.controls["countryId"].setValue(data?.addressMappings[0].address.countryId);
    this.address.controls["countryName"].setValue(data?.addressMappings[0].address.countryName);
    this.address.controls["companyId"].setValue(data?.addressMappings[0].address.companyId);
    this.address.controls["rateZoneId"].setValue(data?.addressMappings[0].address.rateZoneId);
    this.address.controls["latitude"].setValue(data?.addressMappings[0].address.latitude);
    this.address.controls["longitude"].setValue(data?.addressMappings[0].address.longitude);
    this.address.controls["utcCreatedAt"].setValue(new Date());
    this.address.controls["createdBy"].setValue(data?.addressMappings[0].address.createdBy);
    this.address.controls["utcModifiedAt"].setValue(new Date());
    this.address.controls["modifiedBy"].setValue(data?.addressMappings[0].address.modifiedBy);
    this.address.controls["isActive"].setValue(data?.addressMappings[0].address.isActive);
    this.address.controls["timeZoneId"].setValue(data?.addressMappings[0].address.timeZoneId);

    this.addressTypes.controls["addressId"].setValue(data?.addressMappings[0].address.addressTypes[0].addressId);
    this.addressTypes.controls["addressTypeId"].setValue(data?.addressMappings[0].address.addressTypes[0].addressTypeId);

    this.contactPerson.controls["name"].setValue(data?.addressMappings[0].address.contactPerson[0].name);
    this.contactPerson.controls["phone"].setValue(data?.addressMappings[0].address.contactPerson[0].phone);
    this.contactPerson.controls["fax"].setValue(data?.addressMappings[0].address.contactPerson[0].fax);
    this.contactPerson.controls["contactPersonId"].setValue(data?.addressMappings[0].address.contactPerson[0].contactPersonId);
    this.contactPerson.controls["addressId"].setValue(data?.addressMappings[0].address.contactPerson[0].addressId);

    this.emailMapping.controls["contactPersonId"].setValue(data?.addressMappings[0].address.contactPerson[0].emailMapping[0].contactPersonId);
    this.emailMapping.controls["addressId"].setValue(data?.addressMappings[0].address.contactPerson[0].emailMapping[0].addressId);
    this.emailMapping.controls["emailTypeId"].setValue(data?.addressMappings[0].address.contactPerson[0].emailMapping[0].emailTypeId);
    this.emailMapping.controls["email"].setValue(data?.addressMappings[0].address.contactPerson[0].emailMapping[0].email);

    let a:any = [];
    data?.locationTypes.forEach((element:any) => {
      a.push(element.locationTypeId);
    });
    this.locationTypes.controls["locationTypeId"].setValue(a);
  }
 
  save() {
    let data = JSON.parse(JSON.stringify(this.Form.value));
    data.addressMappings.push(this.addressMappings.value);
    let loc = this.locationTypes.value;
    loc.locationTypeId.forEach((element:any) => {
      console.log("🚀 ~ AddLocationsComponent ~ loc[0].locationTypeId.forEach ~ element:", element)
      let d =  {
        "locationId": 0,
        "locationTypeId": element,
        "locationTypeName": "string"
      }
      data.locationTypes.push(d);
    });
    data.addressMappings[0].address = this.address.value;
    data.addressMappings[0].address.addressTypes.push(this.addressTypes.value);
    data.addressMappings[0].address.contactPerson.push(this.contactPerson.value);
    data.addressMappings[0].address.contactPerson[0].emailMapping.push(this.emailMapping.value);
    if (this.Form.valid) {
      let self = this;
      if(this.gl.setRowData) {
        self.srv.UpdateLocation(data).subscribe((m:any) => {
          if (m.success) {
            this.nav.navigateByUrl('/locations');
            this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
          } else {
            this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
          }
        });
      } else {
        self.srv.AddLocation(data).subscribe((m:any) => {
          if (m.success) {
            this.nav.navigateByUrl('/locations');
            this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
          } else {
            this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
          }
        });
      }
    }  else {
      for (let i in this.Form.controls) {
        this.Form.controls[i].markAsTouched();
      }
      for (let i in this.addressMappings.controls) {
        this.addressMappings.controls[i].markAsTouched();
      }
      for (let i in this.address.controls) {
        this.address.controls[i].markAsTouched();
      }
      for (let i in this.addressTypes.controls) {
        this.addressTypes.controls[i].markAsTouched();
      }
      for (let i in this.contactPerson.controls) {
        this.contactPerson.controls[i].markAsTouched();
      }
      for (let i in this.emailMapping.controls) {
        this.emailMapping.controls[i].markAsTouched();
      }
      for (let i in this.locationTypes.controls) {
        this.locationTypes.controls[i].markAsTouched();
      }
      this._snackBar.open("Please fill required fields", "Okay", { 'duration': 3000 });
    }
  }


}