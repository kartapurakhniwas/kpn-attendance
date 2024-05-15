import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExportOrdersComponent } from './export-orders.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { ShippingLineService } from '../../../core/services/shipping-line/shipping-line.service';
import { MasterCallService } from '../../../core/services/master-services/master-services.service';
import { GlobalVariable } from '../../../core/services/global.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FleetAPIService } from '../../../core/services/fleetAPI/fleet-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'add-export-orders',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatIconModule, MatButtonModule, MatSlideToggleModule,MatCheckboxModule, MatDatepickerModule, MatNativeDateModule
  ],
    
  template: `

    <!-- <div class="blackout"></div> -->
    <div class="slide-body">
    <form [formGroup]="Form">
    <div class="row">
      <div class="col-12">
      <h3 class="heading">Customer Line Details</h3>
      </div>
      <div class="col-4">
        <div class="input-wrap flex-input-bx">
          <label class="form-label has-dropdown">
            Customer Name
            <button mat-mini-fab matTooltip="Add new customer" (click)="addCustomer = !addCustomer" class="me-3">
              <i class="ki-duotone ki-plus"></i>
            </button>
            @if (addCustomer) {
              <div class="custom-menu-drop customer-label-w">
              <h3 class="heading">Add New Customer</h3>
              <div class="hr-light"></div>
              <div class="content">
                <div class="row">
                  <div class="col-4">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Bill To</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="Bill To">
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">DBA Alias</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="DBA Alias">
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Time Zone</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="Time Zone">
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">URL</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="URL">
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3">
                    <div class="row">
                      <div class="col-6">
                        <div class="input-wrap">
                          <label class="form-label"> <mat-checkbox>Week Days</mat-checkbox></label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="Week Days">
                          </mat-form-field>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="input-wrap">
                          <label class="form-label"><mat-checkbox>24 Hours</mat-checkbox></label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="24 Hours">
                          </mat-form-field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3">
                    <mat-checkbox>Weekends</mat-checkbox>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <h3 class="heading">Address</h3>
                    <div class="hr-light"></div>
                  </div>
                  <div class="col-4">
                    <div class="input-wrap textarea flex-input-bx">
                      <label class="form-label">Address</label>
                      <mat-form-field appearance="outline">
                        <textarea matInput placeholder="Address"></textarea>
                      </mat-form-field>
                    </div>                    
                  </div>
              <div class="col-1"></div>
                  <div class="col-3">
                    <div class="row">
                      <div class="col-12">
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">City</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="City">
                          </mat-form-field>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">State</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="State">
                          </mat-form-field>
                        </div>
                      </div>
                      <div class="col-12">
                      <div class="input-wrap flex-input-bx">
                      <label class="form-label">Postal</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="Postal">
                      </mat-form-field>
                    </div>
                      </div>                      
                    </div>
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3">     
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">Phone</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="Phone">
                          </mat-form-field>
                        </div>
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">Email</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="Email">
                          </mat-form-field>
                        </div>            
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Toll Free</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="Toll Free">
                      </mat-form-field>
                    </div>
                    <div class="input-wrap flex-input-bx">
                          <label class="form-label">Fax</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="Fax" />
                          </mat-form-field>
                        </div>
                    <div class="text-end">
                      <button mat-raised-button class="me-2">Close</button>
                      <button mat-raised-button color="primary">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            }
           
          </label>
          <mat-form-field appearance="outline">
              <mat-select formControlName="billToId" (selectionChange)="changeCustomer($event)">
              @for(customer of customerList; track customer.id) {
                    <mat-option [value]="customer.id">{{customer.name}}</mat-option>
                  }
              </mat-select>
          </mat-form-field>
        </div>
        @if(selectedCustomer) {
              <ul class="icon-list">
                <li>
                <i class="ki-duotone ki-geolocation">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            </i>
                  <!-- <mat-icon>location_on</mat-icon> -->
                  {{selectedCustomer?.customerAddresses[0].address.streetLine1}}, {{selectedCustomer?.customerAddresses[0].address.cityName}}, {{selectedCustomer?.customerAddresses[0].address.stateName}}, {{selectedCustomer?.customerAddresses[0].address.countryName}}, {{selectedCustomer?.customerAddresses[0].address.postalCode}}
                </li>
                <li>
                  <!-- <mat-icon>mail</mat-icon> -->
                  <i class="ki-duotone ki-sms">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            </i>
                  {{selectedCustomer?.customerAddresses[0].address.contactPerson[0].emailMapping[0].email}}
                </li>
                <li>
                  <!-- <mat-icon>call</mat-icon> -->
                  <i class="ki-duotone ki-phone">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            </i>
                  {{selectedCustomer?.customerAddresses[0].address.contactPerson[0].phone}}
                </li>
              </ul>
            }
      </div>
      <div class="col-1"></div>
      <div class="col-3">
      <div class="row">
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Branch</label>
                      <mat-form-field appearance="outline">
                        <mat-select formControlName="carrierId">
                          @for(carrier of branchList; track
                            carrier.carrierId) {
                          <mat-option [value]="carrier.carrierId"
                            >{{ carrier.name }} </mat-option
                          >
                          }
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>                  
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">PO Number</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="PO Number" formControlName="poNumber">
                      </mat-form-field>
                    </div>
                  </div>                  
                  <div class="col-12">
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">Price</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="Price" formControlName="orderPrice">
                          </mat-form-field>
                        </div>
                      </div>
                  <div class="col-12">
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">Currency</label>
                          <mat-form-field appearance="outline">
                            <mat-select formControlName="currencyType">
                            @for(currency of currencyList; track currency.currencyId) {
                                  <mat-option [value]="currency.currencyId">{{currency.currencyName}} ({{currency.currencyCode}})</mat-option>
                                }
                            </mat-select>
                          </mat-form-field>
                        </div>
                      </div>                 
                </div>
      </div>
      <div class="col-1"></div>
      <div class="col-3">
        <div class="row">
        <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Booking Ref #</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="Booking Ref #" formControlName="refNumber">
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Order Notes</label>
                      <mat-form-field appearance="outline">
                        <input matInput placeholder="Order Notes"  formControlName="orderNotes">
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Leg Type</label>
                      <mat-form-field appearance="outline">
                        <mat-select formControlName="legType">
                        @for(legType of legTypesList; track legType.legTypeId) {
                              <mat-option [value]="legType.legTypeId">{{legType.legTypeName}}</mat-option>
                            }
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
        </div>
      </div>
      <div class="hr-light"></div>
      <div class="col-12">
      <h3 class="heading">Shipping Line Details</h3>
      </div>
        <div class="col-4">
        <div class="input-wrap flex-input-bx">
            <label class="form-label">
              Shipping Line Details
              <button mat-mini-fab matTooltip="Add new customer" class="me-3">
                <i class="ki-duotone ki-plus"></i>
              </button>
            </label>
            <mat-form-field appearance="outline">
                <mat-select formControlName="shippingLineId" (selectionChange)="changeShippingLine($event)">
                @for(shippingLine of shippingLineList; track shippingLine.id) {
                      <mat-option [value]="shippingLine.id">{{shippingLine.name}}</mat-option>
                    }
                </mat-select>
            </mat-form-field>
          </div>
          @if(selectedShippingLine) {
                <ul class="icon-list">
                <li>
                  <!-- <mat-icon>location_on</mat-icon> -->
                  <i class="ki-duotone ki-geolocation">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            </i>
                  {{selectedShippingLine?.shippingLineAddresses[0].address.streetLine1}}, {{selectedShippingLine?.shippingLineAddresses[0].address.cityName}}, {{selectedShippingLine?.shippingLineAddresses[0].address.stateName}}, {{selectedShippingLine?.shippingLineAddresses[0].address.countryName}}, {{selectedShippingLine?.shippingLineAddresses[0].address.postalCode}}
                </li>
                <li>
                  <!-- <mat-icon>mail</mat-icon> -->
                  <i class="ki-duotone ki-sms">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            </i>
                  {{selectedShippingLine?.shippingLineAddresses[0].address.contactPerson[0].emailMapping[0].email}}
                </li>
                <li>
                  <!-- <mat-icon>call</mat-icon> -->
                  <i class="ki-duotone ki-phone">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            </i>
                  {{selectedShippingLine?.shippingLineAddresses[0].address.contactPerson[0].phone}}
                </li>
              </ul>
              }
        </div>
        <div class="col-1"></div>
        <div class="col-3">
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">ERD Date</label>
                      <mat-form-field appearance="outline">
                        <input matInput [matDatepicker]="df" formControlName="erdDate">
                        <mat-datepicker-toggle matIconSuffix [for]="df"></mat-datepicker-toggle>
                        <mat-datepicker #df></mat-datepicker>
                      </mat-form-field>
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">VGM Date</label>
                      <mat-form-field appearance="outline">
                        <input matInput [matDatepicker]="df2" formControlName="vgmDate">
                        <mat-datepicker-toggle matIconSuffix [for]="df2"></mat-datepicker-toggle>
                        <mat-datepicker #df2></mat-datepicker>
                      </mat-form-field>
                    </div>
                  </div>
                  
                  <div class="col-12">
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">No. Of Containers</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="No. Of Containers" formControlName="noOfContainers">
                          </mat-form-field>
                        </div>
                      </div>
                      <div class="col-12">
                    <mat-slide-toggle formControlName="highPriority">High Priority</mat-slide-toggle>
                  </div>
                </div>
                
        <div class="col-1"></div>
        <div class="col-3">
        <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Document Date</label>
                      <mat-form-field appearance="outline">
                        <input matInput [matDatepicker]="df1" formControlName="documentDate">
                        <mat-datepicker-toggle matIconSuffix [for]="df1"></mat-datepicker-toggle>
                        <mat-datepicker #df1></mat-datepicker>
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-wrap flex-input-bx">
                      <label class="form-label">Cargo Cut Off Date</label>
                      <mat-form-field appearance="outline">
                        <input matInput [matDatepicker]="df5" formControlName="cargoDate">
                        <mat-datepicker-toggle matIconSuffix [for]="df5"></mat-datepicker-toggle>
                        <mat-datepicker #df5></mat-datepicker>
                      </mat-form-field>
                    </div>
                  </div>
                  <div class="col-12">
                        <div class="input-wrap flex-input-bx">
                          <label class="form-label">Vessel #</label>
                          <mat-form-field appearance="outline">
                            <input matInput placeholder="Vessel #" formControlName="vesselNo">
                          </mat-form-field>
                        </div>
                      </div>
                      
        </div>
      </div>
    </form>
    </div>

        <div class="slide-footer">
      <button (click)="list.addRowFlag = false" mat-flat-button>Close</button>
      
        @if(this.newGuid != '') {
          <button (click)="goToOrderdetailPage()" mat-flat-button color="primary" class="primary">Go To Order Details</button>
        }
      
      <button (click)="save()" mat-flat-button color="primary" class="primary">
        @if(this.gl.selectedOrder) {
          Update
        } @else {
          Save
        }
      </button>
    </div>
  `
})
export class AddExportOrdersComponent {
  
  addCustomer:boolean = false;
  selectedCustomer:any = null;
  selectedShippingLine:any = null;
  currencyList: any;
  legTypesList: any;
  branchList: any;
  newGuid: string = '';
  customerList: any;
  shippingLineList: any;

  constructor(public list: ExportOrdersComponent, private srv: OrdersService, private customer: CustomerService,
    private shippingLine: ShippingLineService, private master: MasterCallService, public gl: GlobalVariable,
    private fleetApi: FleetAPIService, private _snackBar: MatSnackBar, private nav: Router) {
    this.refresh();
    
  }

  refresh() {
    this.getCurrency();
    this.newGuid = '';
  }

  getCurrency() {
    let self = this;
    self.master.GetCurrency().subscribe((m:any) => {
      if (m.success) {
        this.currencyList = m.lstModel;
        this.GetLegTypes()
      }
    });
  }

  GetLegTypes() {
    let self = this;
    self.master.GetLegTypes().subscribe((m:any) => {
      if (m.success) {
        this.legTypesList = m.lstModel;
        this.getCustomer()
      }
    });
  }

  getCustomer() {
    let self = this;
    self.customer.getAllCustomers(7).subscribe((m: any) => {
      if (m.success) {
        this.customerList = m.lstModel;
        this.getSuppliers();
      }
    });
  }

  getSuppliers() {
    let self = this;
    self.shippingLine.getAllShippingLine(7).subscribe((m: any) => {
      if (m.success) {
        this.shippingLineList = m.lstModel;
        this.getBranchList();
      }
    });
  }

  getBranchList() {
    let self = this;
    self.fleetApi.getAllCarriers().subscribe((m: any) => {
      if (m.respStatus) {
        this.branchList = m.lstModel;
        if (this.gl.selectedOrder) {
          this.getOrderById();
        }
      }
    });
  }

  getOrderById() {
    let self = this;
    console.log("🚀 ~ AddImportOrdersComponent ~ self.srv.getOrderById ~ this.gl.setRowData:", this.gl.setRowData)
    self.srv.getOrderById(this.gl.setRowData.orderId).subscribe((m:any) => {
      if (m.success) {
        this.setValue(m.model);
      }
    });
  }

  Form = new FormGroup({
    orderId: new FormControl(0),
    orderGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    billToId: new FormControl(0),
    billToName: new FormControl(""),
    shippingLineId: new FormControl(0),
    shippingLineName: new FormControl(""),
    refNumber: new FormControl(""),
    poNumber: new FormControl("", Validators.required),
    orderNotes: new FormControl(""),
    vgmDate: new FormControl(new Date),
    cargoDate: new FormControl(new Date),
    erdDate: new FormControl(new Date),
    documentDate: new FormControl(new Date),
    noOfContainers: new FormControl(1),
    vesselNo: new FormControl("", Validators.required),
    createdDate: new FormControl(new Date),
    modifiedDate: new FormControl(new Date),
    createdBy: new FormControl(0),
    modifiedBy: new FormControl(0),
    isDeleted: new FormControl(false),
    deletedBy: new FormControl(0),
    status: new FormControl(1),
    companyId: new FormControl(0),
    orderNumber: new FormControl(""),
    orderTypeId: new FormControl(2),
    legType: new FormControl(0),
    legTypeName: new FormControl(""),
    highPriority: new FormControl(false),
    orderPrice: new FormControl(0),
    currencyType: new FormControl("", Validators.required),
    carrierId: new FormControl(0),
  }) as any;

  setValue(data:any) {
    this.selectedCustomer = null;
    this.selectedShippingLine = null;
    this.newGuid = data?.orderGuid;
    this.Form.controls["orderId"].setValue(data?.orderId);
    this.Form.controls["orderGuid"].setValue(data?.orderGuid);
    this.Form.controls["billToId"].setValue(data?.billToId);
    this.Form.controls["billToName"].setValue(data?.billToName);
    this.Form.controls["shippingLineId"].setValue(data?.shippingLineId);
    this.Form.controls["shippingLineName"].setValue(data?.shippingLineName);
    this.Form.controls["refNumber"].setValue(data?.refNumber);
    this.Form.controls["poNumber"].setValue(data?.poNumber);
    this.Form.controls["orderNotes"].setValue(data?.orderNotes);
    this.Form.controls["vgmDate"].setValue(data?.vgmDate);
    this.Form.controls["cargoDate"].setValue(data?.cargoDate);
    this.Form.controls["erdDate"].setValue(data?.erdDate);
    this.Form.controls["documentDate"].setValue(data?.documentDate);
    this.Form.controls["noOfContainers"].setValue(data?.noOfContainers);
    this.Form.controls["vesselNo"].setValue(data?.vesselNo);
    this.Form.controls["createdDate"].setValue(data?.createdDate);
    this.Form.controls["modifiedDate"].setValue(data?.modifiedDate);
    this.Form.controls["createdBy"].setValue(data?.createdBy);
    this.Form.controls["modifiedBy"].setValue(data?.modifiedBy);
    this.Form.controls["isDeleted"].setValue(data?.isDeleted);
    this.Form.controls["deletedBy"].setValue(data?.deletedBy);
    this.Form.controls["status"].setValue(data?.status);
    this.Form.controls["companyId"].setValue(data?.companyId);
    this.Form.controls["orderNumber"].setValue(data?.orderNumber);
    this.Form.controls["orderTypeId"].setValue(data?.orderTypeId);
    this.Form.controls["legType"].setValue(data?.legType);
    this.Form.controls["legTypeName"].setValue(data?.legTypeName);
    this.Form.controls["highPriority"].setValue(data?.highPriority);
    this.Form.controls["orderPrice"].setValue(data?.orderPrice);
    this.Form.controls["currencyType"].setValue(data?.currencyType);
    this.Form.controls["carrierId"].setValue(data?.carrierId);
    this.changeShippingLine({value:data.shippingLineId});
    this.changeCustomer({value:data.billToId});
  }

  save() {
    let data = JSON.parse(JSON.stringify(this.Form.value));
    data.noOfContainers = Number(data.noOfContainers);
    data.orderPrice = Number(data.orderPrice);
    if (this.Form.valid) {
      if (this.gl.selectedOrder) {
        data.orderId = this.gl.selectedOrder.orderId;
        let self = this;
        self.srv.UpdateOrder(data).subscribe((m: any) => {
          if (m.success) {
            this.Form.reset();
            this._snackBar.open('Updated Successfully', 'Okay', {
              duration: 3000,
            });
            this.gl.selectedOrder = null;
            // this.list.addRowFlag = false;
            this.list.refresh();
          }
        });
      } else {
        let self = this;
        self.srv.AddOrder(data).subscribe((m: any) => {
          if (m.success) {
            this.Form.reset();
            this._snackBar.open('Added Successfully', 'Okay', {
              duration: 3000,
            });
            this.gl.selectedOrder = {"orderId": m.model.orderId};
            // this.list.addRowFlag = false;
            this.list.refresh();
            this.newGuid = m.model.orderGuid;
            console.log("🚀 ~ AddImportOrdersComponent ~ self.srv.AddOrder ~ this.newGuid:", this.newGuid)
            
          }
        });
      }
    } else {
      for (let i in this.Form.controls) {
        this.Form.controls[i].markAsTouched();
      }
      this._snackBar.open('Please fill required fields', 'Okay', {
        duration: 3000,
      });
    }
  }

  goToOrderdetailPage() {
    this.nav.navigateByUrl('/export-orders/details/' + this.newGuid);
  }

  changeShippingLine(event:any) {
    let self = this;
    self.shippingLine.GetById(event.value).subscribe((m:any) => {
      if (m.success) {
        this.Form.controls['shippingLineId'].setValue(m.model.id);
        this.selectedShippingLine = m.model;
      }
    });
  }

  changeCustomer(event:any) {
    let self = this;
    self.customer.GetById(event.value).subscribe((m:any) => {
      if (m.success) {
        this.Form.controls['billToId'].setValue(m.model.id);
        this.selectedCustomer = m.model;
      }
    });
  }

}