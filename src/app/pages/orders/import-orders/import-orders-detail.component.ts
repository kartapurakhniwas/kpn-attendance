import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NavItems } from '../../../ui/components/inner-nav.component';
import { ActionMenu } from './agComponents/action.component';
import { GlobalVariable } from '../../../core/services/global.service';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ContainerService } from '../../../core/services/container/container.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShippingLineService } from '../../../core/services/shipping-line/shipping-line.service';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { MasterCallService } from '../../../core/services/master-services/master-services.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { FleetAPIService } from '../../../core/services/fleetAPI/fleet-api.service';
import { AssignContainerService } from '../../../core/services/container-assignment/container-assignment.service';
import { DriverService } from '../../../core/services/driver/driver.service';
import { ContainerPickdropLocationService } from '../../../core/services/container-pickdrop-location/container-pickdrop-location.service';
import { LocationTabComponent } from "../../../ui/components/order-detail-components/location-tab/locaiton-tab.component";
import { LocationsService } from '../../../core/services/locations/locations.service';
import { ContainerLoadingUnloadingLocationService } from '../../../core/services/ContainerLoadingUnLoadingLocation/Container-Loading-UnLoading-Location.service';
import { HistoryTabComponent } from "../../../ui/components/order-detail-components/history-tab/history-tab.component";
import { AssignTabFormComponent } from "../../../ui/components/order-detail-components/assign-tab-form/assign-tab-form.component";
import { PlannerComponent } from "../../../ui/components/order-detail-components/planner/planner.component";
import { UploadDocTabComponent } from "../../../ui/components/order-detail-components/upload-doc-tab/upload-doc-tab.component";
import { ContinerTypeDropdownComponent } from '../../../ui/components/order-detail-components/ag-container-type-col-dropdown/ag-container-type-col-dropdown.component';
import { ExcelUploadPopupComponent } from '../../../core/shared/widgets/excel-upload-popup/excel-upload-popup';
import { ExcelDataPopupComponent } from '../../../core/shared/widgets/excel-upload-popup/excel-data-popup';
import { MatDialog } from '@angular/material/dialog';



@Component({
    selector: 'app-import-orders',
    standalone: true,
    templateUrl: './import-orders-detail.component.html',
    imports: [FormsModule, CommonModule, AgGridModule, MatMenuModule, MatExpansionModule,
        MatButtonModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
        MatTooltipModule, MatSlideToggleModule, MatTabsModule, NavItems, MatSelectModule,
        ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, LocationTabComponent, HistoryTabComponent, AssignTabFormComponent, PlannerComponent, UploadDocTabComponent]
}) 
export class ImportOrdersDetailComponent { 
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  @ViewChild('historyTab') historyTab: HistoryTabComponent | undefined;
  @ViewChild('plannerRef') plannerRef: PlannerComponent | undefined;
  
  detailFlag:boolean = false; // should be false
  columnDefs: any;
  rowSelection: any;
  defaultColDef: any;
  isfilter: boolean = true;
  gridApi: any;
  gidColumnApi: any;
  getpaged: any = [];
  gridOptions: any;
  sidebarFlag: boolean = false;
  gridColumnApi: any;
  containerList: any;
  selectedShippingLine:any = null;
  selectedCustomer:any = null;
  customerList: any;
  shippingLineList: any;
  currencyList: any;
  legTypesList: any;
  guid: string | null = '';
  orderId: any;
  refNumber: any;
  branchList: any;
  assignmentData: any;
  containerLoadList: any;
  containerStatusList: any;
  containerTypeList: any;
  unitList: any = [];
  driverList: any;
  truckList: any;
  trailerList: any;
  
  assignedLocations: any;
  pickupLocation: any;
  unloadingLocationName: any;
  returnLocationName: any;
  unloadingLocations: any;
  dropLocation: any;
  yardLocationsList: any;
  finishFlag: boolean = false;
  historyLst: any;
  orderNumber: any;

  btnClick(fieldName:any, event:any) {
    let col = this.gridApi.getColumn(fieldName);
    if (event.checked) {
      this.gridApi.setColumnVisible(col, col.visible = true );
    } else {
      this.gridApi.setColumnVisible(col, col.visible = false);
    }
  }

  containerModel:any = {}

  constructor(public gl: GlobalVariable, private srv: OrdersService, private container: ContainerService,
    private shippingLine: ShippingLineService, private customer: CustomerService,
    private master: MasterCallService,private route: ActivatedRoute, private nav: Router,
    private fleetApi: FleetAPIService, private assignContainer: AssignContainerService,
    private _snackBar: MatSnackBar, private dialog: MatDialog,
     
    ) {
    this.columnDefs = [
      { field: 'S_NO', headerName: ' S. NO.', width: 95,  
        headerCheckboxSelection: true,
        checkboxSelection: true,
        sortingOrder: ["asc", "desc"],
        valueGetter: (params:any) => params.node.rowIndex + 1,
        pinned: 'left'
      },
      // {field: 'action', headerName: 'Action',   cellRenderer: ActionMenu, context: { parentComponent: this },  pinned: 'left',  width: 105,  },
      { field: 'containerNo', headerName: 'container No', width: 140, editable: true},
      { 
        field: 'containerTypeId', 
        headerName: 'container Type', 
        width: 140,
        cellRenderer: ContinerTypeDropdownComponent, 
        // cellRendererParams: (params:any) => {
        //   const iterationObject = params.data;
        //   return {iterationObject};
        // }
      },
      { field: 'tareWeight', headerName: 'tareWeight', width: 140, editable: true},
      { field: 'grossWeight', headerName: 'grossWeight', width: 140, editable: true},
      { 
        field: 'driverName', 
        headerName: 'driverName', 
        width: 140,
        valueGetter: (params:any) => {
          return params.data.containerLoad.driverName
        }
      },
      { 
        field: 'truckNo', 
        headerName: 'truck No', 
        width: 140,
        valueGetter: (params:any) => {
          return params.data.containerLoad.truckNo
        }
      },
      { 
        field: 'chassisNumber', 
        headerName: 'chassisNumber', 
        width: 140,
        valueGetter: (params:any) => {
          return params.data.containerLoad.chassisNumber
        }
      },
      { 
        field: 'containerLoadStatusName', 
        headerName: 'containerLoadStatus', 
        width: 140,
        valueGetter: (params:any) => {
          return params.data.containerLoad.containerLoadStatusName
        }
      },
      { field: 'statusName', headerName: 'Status Name' , width: 140 }
     
    ];
    this.rowSelection = "single";

    this.defaultColDef = {
      editable: false,
      resizable: true,
      filter: true,
    };  
  }

  Form = new FormGroup({
    orderId: new FormControl(0),
    orderGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    billToId: new FormControl(0),
    billToName: new FormControl(""),
    shippingLineId: new FormControl(0),
    shippingLineName: new FormControl(""),
    refNumber: new FormControl("", Validators.required),
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
    orderNumber: new FormControl("", Validators.required),
    orderTypeId: new FormControl(2),
    legType: new FormControl(0),
    legTypeName: new FormControl(""),
    highPriority: new FormControl(false),
    orderPrice: new FormControl(0),
    currencyType: new FormControl("", Validators.required),
    carrierId: new FormControl(0),
  }) as any;

  OrderDetailForm = new FormGroup({
    containerId: new FormControl(0),
    containerGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    containerNo: new FormControl(''),
    containerCheckDigit: new FormControl(0),
    tareWeight: new FormControl(0),
    grossWeight: new FormControl(0),
    weightId: new FormControl(0),
    containerOwnerId: new FormControl(0),
    temperature: new FormControl(0),
    temperatureUnitId: new FormControl(0),
    orderId: new FormControl(0),
    carrierId: new FormControl(0),
    statusId: new FormControl(0),
    createdBy: new FormControl(0),
    utcCreatedAt: new FormControl(new Date),
    modifiedBy: new FormControl(0),
    utcModifiedAt: new FormControl(new Date),
    isDeleted: new FormControl(false),
    deletedBy: new FormControl(0),
    utcDeletedAt: new FormControl(new Date),
  });

  ngOnInit(): void {
    this.refresh();
    let d = new Date;
    this.gl.dateToTimeString(d);
    this.getOrderById();
  }

  refresh(){
    this.gl.setRowData = null;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.guid = params.get('guid');
    });
    this.getCurrency();
  }

  getCurrency() {
    let self = this;
    self.master.GetCurrency().subscribe((m:any) => {
      // console.log("🚀 ~ AddImportOrdersComponent ~ self.master.GetCurrency ~ m:", m)
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
        
      }
    });
  }

  getOrderById(){
    let self = this;
    self.srv.getOrderByGuid(this.guid).subscribe((m:any) => {
      if (m.success) {
        // console.log("🚀 ~ ImportOrdersDetailComponent ~ self.srv.getOrderByGuid ~ m.model:", m.model);
        this.refNumber = m.model.refNumber;
        this.setValue(m.model);
        this.orderId = m.model?.orderId;
        this.orderNumber = m.model?.orderNumber;
        this.getContainerById(m.model.orderId);
      }
    });
  }

  getContainerById(id:any){
    let self = this;
    self.container.getContainersByOrderId(id).subscribe((m:any) => {
      if (m.success) {
        this.getpaged = m.lstModel;
      }
    });
  }

  setValue(data:any) {
    this.selectedCustomer = null;
    this.selectedShippingLine = null;
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

  getValues() {
    console.log(JSON.stringify(this.getpaged), "getpagedgetpagedgetpagedgetpaged");
    
  }

  addContainerRow() {
    let self = this;
    self.container.addContainer(this.orderId).subscribe((m:any) => {
      if (m.success) {
        this.containerModel = m.model;
        this.getpaged.push(m.model);
        this.gridApi.setGridOption('rowData', this.getpaged);
      }
    });
  }

  onCellValueChanged(data:any) {
    let payload = data.data;
    let self = this;
    console.log(payload, "payload");
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
        // console.log("🚀 ~ ImportOrdersDetailComponent ~ self.container.updateContainer ~ m:", m)
        
      } 
    });
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

  

  selectedColumns!: any[];
  
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

  onGridReady(params: any) {
    this.gridOptions = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setGridOption('rowData', this.getpaged);
  }

  onSelectionChanged() {
    this.detailFlag = false;
    this.gl.setRowData = null;
    const selectedNodes = this.agGrid?.api.getSelectedNodes();
    const selectedData: any = selectedNodes?.map((node:any) => node.data);
    this.gl.setRowData = JSON.stringify(selectedData[0])
      ? selectedData[0]
      : null;

    if (this.gl.setRowData) {
      console.log("🚀 ~ ImportOrdersDetailComponent ~ onSelectionChanged ~ this.gl.setRowData:", this.gl.setRowData)
      this.detailFlag = true;
    }
  }

  

  Planners = new FormGroup({
    containerAssignmentPlannerId: new FormControl(0),
    containerId: new FormControl(0),
    loadId: new FormControl(0),
    statusId: new FormControl(0),
    assignedBy: new FormControl(0),
    utcAssignedAt: new FormControl(new Date),
    eventId: new FormControl(0),
    driverId: new FormControl(0),
    truckId: new FormControl(0),
    trailerId: new FormControl(0),
    locationId: new FormControl(0),
    locationTypeId: new FormControl(0),
    sequenceNumber: new FormControl(0),
    isVisited: new FormControl(true),
    isActive: new FormControl(true),
  });

  save() {
    let data = JSON.parse(JSON.stringify(this.Form.value));
    data.noOfContainers = Number(data.noOfContainers);
    data.orderPrice = Number(data.orderPrice);
    if (this.Form.valid) {
        data.orderId = this.orderId;
        let self = this;
        self.srv.UpdateOrder(data).subscribe((m: any) => {
          if (m.success) {
            this._snackBar.open('Updated Successfully', 'Okay', {
              duration: 3000,
            });
          }
        });
    } else {
      for (let i in this.Form.controls) {
        this.Form.controls[i].markAsTouched();
      }
      this._snackBar.open('Please fill required fields', 'Okay', {
        duration: 3000,
      });
    }
  }

  onTabChange(index: number) {
    if (index === 1) {
      this.historyTab?.refresh();
    } else if (index === 2) {
      this.plannerRef?.refresh();
    }
  }

  onTabChangeInner(index: number) {
    if (index === 0) {
      this.plannerRef?.refresh();
    } else if (index === 1) {
      this.historyTab?.refresh();
    }
  }


  
  OpenUploadexcelFilter() {
    let obj = { 'Title': 'Upload Excel' }
    const dialogRef = this.dialog.open(ExcelUploadPopupComponent, {
      width: '350px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result, 'result');

      let data = { 'file': result.file }

      const formData = new FormData();

      formData.append('documentTypeId', result.formatType);
      formData.append('documentName', result.fileName);
      formData.append('file', new Blob([result.binaryData]), result.fileName);

      this.srv.UploadContainerExcelFile(formData, this.orderId).subscribe((m: any) => {
        if (m.success) {

          this.OpenUploadexcelData(m.dataList);
        } else {
          this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
        }
      });
    });
  }

  OpenUploadexcelData(returnList: any) {
    let obj = { 'Title': 'Uploaded Data', 'List': returnList }
    const dialogRef = this.dialog.open(ExcelDataPopupComponent, {
      width: '800px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result,'result');

    });
  }



}