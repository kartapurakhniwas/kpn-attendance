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
import { Router, ParamMap, RouterModule } from '@angular/router';
import { CustomerService } from '../../core/services/customer/customer.service';
import { FleetAPIService } from '../../core/services/fleetAPI/fleet-api.service';



@Component({
  selector: 'app-add-customers',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AgGridModule, MatMenuModule, MatExpansionModule,
    MatButtonModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,RouterModule,
    MatTooltipModule, MatSlideToggleModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './add-customers.component.html'
})
export class AddCustomersComponent {
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
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
  issueStateList: any;
  states: any;
  cities: any;
  emailTypeList: any;
  addresTypeList: any;
  isWeekEnd:boolean = false;
  isWeekDay:boolean = false;
  isWeekDay24Hour:boolean = false;
  isWeeEnd24Hour:boolean = false;
  timeZoneList: any;

  constructor(public gl: GlobalVariable, private master: MasterCallService, private _snackBar: MatSnackBar,
    private srv: CustomerService, private nav: Router
  ) {
  }

  ngOnInit(): void {
    this.refresh();  
  }

  refresh() {
    this.getTimeZone()
  }

  getTimeZone(){
    let self = this;
    self.master.getTimeZone().subscribe((m: any) => {
      if (m.respStatus) {
        this.timeZoneList = m.lstModel;
        this.getCountries()
      }
    });
  }

  getCountries() {
    let self = this;
      self.master.getAllCountries().subscribe((m) => {
        if (m.respStatus) {
          this.countries = m.lstModel;
          this.stateInit({value: 2});
          if(this.gl.setRowData) {
            this.countryInit({value: this.gl.setRowData.customerAddresses[0].address.countryId});
          }
        } 
      });
  }

  countryInit(event:any) {
    let self = this;
    self.master.getStateWithCountry(event.value).subscribe((m:any) => {
      if (m.respStatus) {
        this.states = m.lstModel;
        if(this.gl.setRowData) {
          this.stateChange({value:this.gl.setRowData.customerAddresses[0].address.stateId});
        }
      }
    });
  }

  stateInit(event:any) {
    let self = this;
    self.master.getCityWithState(event.value).subscribe((m:any) => {
      if (m.respStatus) {
        this.cities = m.lstModel;
        
        // this.getEmailTypeId()
        if(this.gl.setRowData) {
          this.getById(this.gl.setRowData)
        }    
      }
    });
  }

  countryChange(event:any) {
    let self = this;
    self.master.getStateWithCountry(event.value).subscribe((m:any) => {
      if (m.respStatus) {
        this.states = m.lstModel;
        // if(this.gl.setRowData) {
        //   this.stateChange({value:this.gl.setRowData.customerAddresses[0].address.cityId});
        // }
      }
    });
  }

  stateChange(event:any) {
    let self = this;
    self.master.getCityWithState(event.value).subscribe((m:any) => {
      if (m.respStatus) {
        this.cities = m.lstModel;
        //   if(this.gl.setRowData) {
        //   this.stateChange(this.gl.setRowData.customerAddresses);
        // }
        
      }
    });
  }

  getById(data:any) {
    let self = this;
    self.srv.GetById(data.id).subscribe((m:any) => {
      if (m.success) {
        this.setValue(m.model);
      }
    });
  }

  

  // getEmailTypeId() {
  //   let self = this;
  //   self.master.getEmailTypeId().subscribe((m:any) => {
  //     if (m.respStatus) {
  //       this.emailTypeList = m.lstModel;
  //     }
  //   });
  // }

  selectedColumns!: any[];

  Form = new FormGroup({
    addressId: new FormControl(0),
    customerGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    id: new FormControl(0),
    shippingLineGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    name: new FormControl('', Validators.required),
    alias: new FormControl('', Validators.required),
    timeZoneId: new FormControl(null, Validators.required),
    url: new FormControl('', Validators.required),
    isWeekEnd: new FormControl(true),
    isWeek24Hour: new FormControl(true),
    isWeeEnd24Hour: new FormControl(true),
    weekDaysHoursFrom: new FormControl(''),
    weekDaysHoursTo: new FormControl(''),
    weekEndHoursFrom: new FormControl(''),
    weekEndHoursTo: new FormControl(''),
    isActive: new FormControl(true),
    companyId: new FormControl(7),
    utcCreatedAt: new FormControl(new Date),
    createdBy: new FormControl(0),
    utcModifiedAt: new FormControl(new Date),
    modifiedBy: new FormControl(0),
    scacCode: new FormControl(''),
    customerAddresses: new FormControl([])
  }) as any;

  customerAddresses = new FormGroup({
    customerId: new FormControl(0),
    addressId: new FormControl(1),
    address: new FormControl({})
  }) as any;

  address = new FormGroup({
    addressId: new FormControl(0),
    addressGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    addressTitle: new FormControl(''),
    streetLine1: new FormControl('', Validators.required),
    streetLine2: new FormControl(''),
    cityId: new FormControl(null, Validators.required),
    cityName: new FormControl(''),
    stateId: new FormControl(null, Validators.required),
    stateName: new FormControl(''),
    postalCode: new FormControl('', Validators.required),
    countryId: new FormControl(1, Validators.required),
    countryName: new FormControl(''),
    companyId: new FormControl(0),
    rateZoneId: new FormControl(0),
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

  setValue(data:any) {
    this.Form.controls["id"].setValue(data?.id);
    this.Form.controls["addressId"].setValue(data.customerAddresses[0].addressId);
    this.Form.controls["customerGuid"].setValue(data.customerGuid);
    // customerGuid
    this.Form.controls["shippingLineGuid"].setValue(data?.shippingLineGuid);
    this.Form.controls["name"].setValue(data?.name);
    this.Form.controls["alias"].setValue(data?.alias);
    this.Form.controls["timeZoneId"].setValue(data?.timeZoneId);
    this.Form.controls["url"].setValue(data?.url);
    this.Form.controls["isWeekEnd"].setValue(data?.isWeekEnd);
    this.Form.controls["isWeek24Hour"].setValue(data?.isWeek24Hour);
    this.Form.controls["isWeeEnd24Hour"].setValue(data?.isWeeEnd24Hour);
    this.Form.controls["weekDaysHoursFrom"].setValue(data?.weekDaysHoursFrom.trim());
    this.Form.controls["weekDaysHoursTo"].setValue(data?.weekDaysHoursTo.trim());
    this.Form.controls["weekEndHoursFrom"].setValue(data?.weekEndHoursFrom.trim());
    this.Form.controls["weekEndHoursTo"].setValue(data?.weekEndHoursTo.trim());
    this.Form.controls["isActive"].setValue(data?.isActive);
    this.Form.controls["companyId"].setValue(data?.companyId);
    this.Form.controls["utcCreatedAt"].setValue(data?.utcCreatedAt);
    this.Form.controls["createdBy"].setValue(data?.createdBy);
    // this.Form.controls["utcModifiedAt"].setValue(data?.utcModifiedAt);
    // this.Form.controls["modifiedBy"].setValue(data?.modifiedBy);
    this.Form.controls["scacCode"].setValue(data?.scacCode);
    // this.Form.controls["customerAddresses"].setValue(data?.customerAddresses);

    this.customerAddresses.controls["customerId"].setValue(data.customerAddresses[0].customerId);
    this.customerAddresses.controls["addressId"].setValue(data.customerAddresses[0].addressId);
    // this.Form.controls["address"].setValue(data.address);

    this.address.controls["addressId"].setValue(data.customerAddresses[0].address.addressId);
    this.address.controls["addressGuid"].setValue(data.customerAddresses[0].address.addressGuid);
    this.address.controls["addressTitle"].setValue(data.customerAddresses[0].address.addressTitle);
    this.address.controls["streetLine1"].setValue(data.customerAddresses[0].address.streetLine1);
    this.address.controls["streetLine2"].setValue(data.customerAddresses[0].address.streetLine2);
    this.address.controls["cityId"].setValue(data.customerAddresses[0].address.cityId);
    this.address.controls["cityName"].setValue(data.customerAddresses[0].address.cityName);
    this.address.controls["stateId"].setValue(data.customerAddresses[0].address.stateId);
    this.address.controls["stateName"].setValue(data.customerAddresses[0].address.stateName);
    this.address.controls["postalCode"].setValue(data.customerAddresses[0].address.postalCode);
    this.address.controls["countryId"].setValue(data.customerAddresses[0].address.countryId);
    this.address.controls["countryName"].setValue(data.customerAddresses[0].address.countryName);
    this.address.controls["companyId"].setValue(data.customerAddresses[0].address.companyId);
    this.address.controls["rateZoneId"].setValue(data.customerAddresses[0].address.rateZoneId);
    this.address.controls["latitude"].setValue(data.customerAddresses[0].address.latitude);
    this.address.controls["longitude"].setValue(data.customerAddresses[0].address.longitude);
    this.address.controls["utcCreatedAt"].setValue(data.customerAddresses[0].address.utcCreatedAt);
    this.address.controls["createdBy"].setValue(data.customerAddresses[0].address.createdBy);
    this.address.controls["utcModifiedAt"].setValue(data.customerAddresses[0].address.utcModifiedAt);
    this.address.controls["modifiedBy"].setValue(data.customerAddresses[0].address.modifiedBy);
    this.address.controls["isActive"].setValue(data.customerAddresses[0].address.isActive);
    this.address.controls["timeZoneId"].setValue(data.customerAddresses[0].address.timeZoneId);
    // this.Form.controls["addressTypes"].setValue(data.addressTypes);
    // this.Form.controls["contactPerson"].setValue(data.contactPerson);
    this.addressTypes.controls["addressId"].setValue(data.customerAddresses[0].address.addressTypes[0].addressId);
    this.addressTypes.controls["addressTypeId"].setValue(data.customerAddresses[0].address.addressTypes[0].addressTypeId);
   
    this.contactPerson.controls["contactPersonId"].setValue(data.customerAddresses[0].address.contactPerson[0].contactPersonId);
    this.contactPerson.controls["addressId"].setValue(data.customerAddresses[0].address.contactPerson[0].addressId);
    this.contactPerson.controls["name"].setValue(data.customerAddresses[0].address.contactPerson[0].name);
    this.contactPerson.controls["phone"].setValue(data.customerAddresses[0].address.contactPerson[0].phone);
    this.contactPerson.controls["fax"].setValue(data.customerAddresses[0].address.contactPerson[0].fax);
    // this.contactPerson.controls["emailMapping"].setValue(data.customerAddresses[0].address.contactPerson[0].emailMapping);

    this.emailMapping.controls["contactPersonId"].setValue(data.customerAddresses[0].address.contactPerson[0].emailMapping[0].contactPersonId);
    this.emailMapping.controls["addressId"].setValue(data.customerAddresses[0].address.contactPerson[0].emailMapping[0].addressId);
    this.emailMapping.controls["emailTypeId"].setValue(data.customerAddresses[0].address.contactPerson[0].emailMapping[0].emailTypeId);
    this.emailMapping.controls["email"].setValue(data.customerAddresses[0].address.contactPerson[0].emailMapping[0].email);
  }


  // AG GRID


  onFilterChanged() {
    let temp = this.gridApi.getFilterModel();

    if (Object.keys(this.gridApi.getFilterModel()).length > 0) {
      this.isfilter = true;
    }
    else {
      this.isfilter = false
    }
  }
  
  save() {
    let data = JSON.parse(JSON.stringify(this.Form.value));
    data.customerAddresses.push(this.customerAddresses.value);
    data.customerAddresses[0].address = this.address.value;
    data.customerAddresses[0].address.addressTypes.push(this.addressTypes.value);
    data.customerAddresses[0].address.contactPerson.push(this.contactPerson.value);
    data.customerAddresses[0].address.contactPerson[0].emailMapping.push(this.emailMapping.value);
    console.log("🚀 ~ AddShippingLineComponent ~ save ~ data:", data);
    if (this.Form.valid) {
      let self = this;
      if (this.gl.setRowData) {
        self.srv.update(data).subscribe((m:any) => {
          if (m.success) {
            this.nav.navigateByUrl('/customers');
            this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
          } else {
            this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
          }
        });
      } else {
        self.srv.AddCustomer(data).subscribe((m:any) => {
          if (m.success) {
            this.nav.navigateByUrl('/customers');
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
      for (let i in this.customerAddresses.controls) {
        this.customerAddresses.controls[i].markAsTouched();
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
      this._snackBar.open("Please fill required fields", "Okay", { 'duration': 3000 });
    }
  }

  isWeek24(event:any) {
    if (event.checked) {
      this.Form.controls["weekDaysHoursFrom"].setValue('');
      this.Form.controls["weekDaysHoursTo"].setValue('');
    }
  }

  isWeekEnd24(event:any) {
    if (event.checked) {
      this.Form.controls["weekEndHoursFrom"].setValue('');
      this.Form.controls["weekEndHoursTo"].setValue('');
    }
  }


}