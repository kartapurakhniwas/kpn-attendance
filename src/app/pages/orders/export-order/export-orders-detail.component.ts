import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
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
import { NavItems } from '../../../ui/components/inner-nav.component';
import { ActionMenu } from './agComponents/action.component';
import { GlobalVariable } from '../../../core/services/global.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContainerService } from '../../../core/services/container/container.service';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { FleetAPIService } from '../../../core/services/fleetAPI/fleet-api.service';
import { MasterCallService } from '../../../core/services/master-services/master-services.service';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ShippingLineService } from '../../../core/services/shipping-line/shipping-line.service';
import { LocationsService } from '../../../core/services/locations/locations.service';
import { ContainerPickdropLocationService } from '../../../core/services/container-pickdrop-location/container-pickdrop-location.service';
import { ContainerLoadingUnloadingLocationService } from '../../../core/services/ContainerLoadingUnLoadingLocation/Container-Loading-UnLoading-Location.service';
import { core } from '@angular/compiler';
import {AssignContainerService} from  '../../../core/services/container-assignment/container-assignment.service';
import { LocationTabComponent } from "../../../ui/components/order-detail-components/location-tab/locaiton-tab.component";
import { AssignTabFormComponent } from "../../../ui/components/order-detail-components/assign-tab-form/assign-tab-form.component";
import { PlannerComponent } from "../../../ui/components/order-detail-components/planner/planner.component";
import { HistoryTabComponent } from "../../../ui/components/order-detail-components/history-tab/history-tab.component";
import { UploadDocTabComponent } from "../../../ui/components/order-detail-components/upload-doc-tab/upload-doc-tab.component";
import { ContinerTypeDropdownComponent } from '../../../ui/components/order-detail-components/ag-container-type-col-dropdown/ag-container-type-col-dropdown.component';
import { ExcelDataPopupComponent } from '../../../core/shared/widgets/excel-upload-popup/excel-data-popup';
import { ExcelUploadPopupComponent } from '../../../core/shared/widgets/excel-upload-popup/excel-upload-popup';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-export-orders',
    standalone: true,
    templateUrl: './export-orders-detail.component.html',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, AgGridModule, MatMenuModule, MatExpansionModule,
        MatButtonModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
        MatTooltipModule, MatSlideToggleModule, MatTabsModule, NavItems, MatSelectModule,
        MatDatepickerModule, MatNativeDateModule, LocationTabComponent, AssignTabFormComponent, PlannerComponent, HistoryTabComponent, UploadDocTabComponent]
})
export class ExportOrdersDetailComponent {
  @ViewChild("agGrid") agGrid: AgGridAngular | undefined;
  @ViewChild('historyTab') historyTab: HistoryTabComponent | undefined;
  @ViewChild('plannerRef') plannerRef: PlannerComponent | undefined;
  detailFlag: boolean = false; // should be false
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
  selectedShippingLine: any;
  selectedCustomer: any;
  customerList: any;
  shippingLineList: any;
  currencyList: any;
  legTypesList: any;
  guid: string | null = '';
  orderId: any;
  refNumber: any;
  branchList: any;
  pickupLocations: any;
  emptyLocations: any;
  pickupLocationName: any;
  containerId: any;
  pickupLocationModel: any;
  emptyLocationName: any;
  unloadingLocations: any;
  unloadingLocationName: any;
  loadingUnloadingLocations: any;
  containerLoadList: any;
  isunloadingEdit: boolean = false;
  historyLst:any;
  orderNumber: any;

  btnClick(fieldName: any, event: any) {
    let col = this.gridApi.getColumn(fieldName);
    if (event.checked) {
      this.gridApi.setColumnVisible(col, col.visible = true);
    } else {
      this.gridApi.setColumnVisible(col, col.visible = false);
    }
  }

  containerModel: any = {}

  constructor(public gl: GlobalVariable, private srv: OrdersService, private container: ContainerService,
    private _snackBar: MatSnackBar, private shippingLine: ShippingLineService, private customer: CustomerService,
    private master: MasterCallService, private route: ActivatedRoute, private nav: Router, private dialog: MatDialog,
    private fleetApi: FleetAPIService, private _srvLocationsService: LocationsService, private _srvContainerPickdropLocationService: ContainerPickdropLocationService
    , private _srvContainerLoadingUnloadingLocationService: ContainerLoadingUnloadingLocationService, private _srvAssignContainerService: AssignContainerService) {

    this.columnDefs = [
      {
        field: 'S_NO', headerName: ' S. NO.', width: 95,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        sortingOrder: ["asc", "desc"],
        pinned: 'left'
      },
      { field: 'action', headerName: 'Action', cellRenderer: ActionMenu, pinned: 'left', width: 105, },
      { field: 'containerNo', headerName: 'container No', width: 140, editable: true },
      
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
      { field: 'tareWeight', headerName: 'tareWeight', width: 140, editable: true },
      { field: 'grossWeight', headerName: 'grossWeight', width: 140, editable: true },
      {
        field: 'driverName',
        headerName: 'driverName',
        width: 140,
        valueGetter: (params: any) => {
          return params.data.containerLoad.driverName
        }
      },
      {
        field: 'truckNo',
        headerName: 'truck No',
        width: 140,
        valueGetter: (params: any) => {
          return params.data.containerLoad.truckNo
        }
      },
      {
        field: 'chassisNumber',
        headerName: 'chassisNumber',
        width: 140,
        valueGetter: (params: any) => {
          return params.data.containerLoad.chassisNumber
        }
      },
      {
        field: 'containerLoadStatusName',
        headerName: 'containerLoadStatus',
        width: 140,
        valueGetter: (params: any) => {
          return params.data.containerLoad.containerLoadStatusName
        }
      },
      { field: 'statusName', headerName: 'statusName', width: 140 },
      { width: 70 }

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


  exportLocationForm = new FormGroup({
    containerPickLocationId: new FormControl(0),
    containerPickLocationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    orderId: new FormControl(0),
    containerId: new FormControl(0),
    legTypeId: new FormControl(0),
    pickUpLocationId: new FormControl(0),
    pickUpFromDateTime: new FormControl(),
    pickUpToDateTime: new FormControl(),
    pickUpReservationNo: new FormControl(''),
    pickUpTVAId: new FormControl(''),
    pickUpReservationFromDateTime: new FormControl(),
    pickUpReservationToDateTime: new FormControl(),
    pickUpReservationComments: new FormControl(),
    pickUpReservationDateTime: new FormControl(),
    addressTypeId: new FormControl(1)
  }) as any;

  dropLocationForm = new FormGroup({
    containerDropLocationId: new FormControl(0),
    containerDropLocationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
    orderId: new FormControl(0),
    containerId: new FormControl(0),
    legTypeId: new FormControl(0),
    dropLocationId: new FormControl(0),
    dropOffFromDateTime: new FormControl(),
    dropOffToDateTime: new FormControl(),
    dropOffReservationNo: new FormControl(''),
    dropOffTVAId: new FormControl(''),
    dropOffReservationFromDateTime: new FormControl(),
    dropOffReservationToDateTime: new FormControl(),
    dropOffReservationComments: new FormControl("Empty"),
    dropOffReservationDateTime: new FormControl(),
    addressTypeId: new FormControl(1)
  }) as any;

  // unloadlocationForm = new FormGroup({
  //   containerId: new FormControl(0),
  //   containerLoadingUnLoadingLocationId: new FormControl(0),
  //   containerLoadingUnLoadingLocationGuid: new FormControl('3fa85f64-5717-4562-b3fc-2c963f66afa6'),
  //   locationId: new FormControl(0),
  //   loadingUnLoadingDate: new FormControl(),
  //   purchaseOrderNumber: new FormControl(),
  //   isInspectionRequired: new FormControl(false),
  //   sequenceNo: new FormControl(0),
  //   isDeleted: new FormControl(false),
  //   deletedBy: new FormControl(0),
  //   remarks: new FormControl()
  // }) as any;

  ngOnInit(): void {
    this.refresh();
    let d = new Date;
    this.gl.dateToTimeString(d);
    this.getOrderById();
  }

  refresh() {
    this.gl.setRowData = null;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.guid = params.get('guid');
    });
    this.getCurrency();
    this.getLocations(1);
    this.getEmptyLocations(3);
    this.getUnloadingLocations(2);
  }

  getCurrency() {
    let self = this;
    self.master.GetCurrency().subscribe((m: any) => {
      if (m.success) {
        this.currencyList = m.lstModel;
        this.GetContainerLoadStatus()
      }
    });
  }

  GetContainerLoadStatus() {
    let self = this;
    self.master.GetContainerLoadStatus().subscribe((m: any) => {
      if (m.success) {
        this.containerLoadList = m.lstModel;
        this.GetLegTypes()
      }
    });
  }

  GetLegTypes() {
    let self = this;
    self.master.GetLegTypes().subscribe((m: any) => {
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

  getOrderById() {
    let self = this;
    self.srv.getOrderByGuid(this.guid).subscribe((m: any) => {
      if (m.success) {
        console.log("🚀 ~ ImportOrdersDetailComponent ~ self.srv.getOrderByGuid ~ m.model:", m.model);
        this.refNumber = m.model.refNumber;
        this.setValue(m.model);
        this.orderId = m.model?.orderId;
        this.orderNumber = m.model?.orderNumber;
        this.getContainerById(m.model.orderId);
      }
    });
  }

  getContainerById(id: any) {
    let self = this;
    self.container.getContainersByOrderId(id).subscribe((m: any) => {
      if (m.success) {
        this.getpaged = m.lstModel;
      }
    });
  }

  setValue(data: any) {
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
    this.changeShippingLine({ value: data.shippingLineId });
    this.changeCustomer({ value: data.billToId });
  }

  getValues() {
    console.log(JSON.stringify(this.getpaged), "getpagedgetpagedgetpagedgetpaged");

  }

  addContainerRow() {
    console.log("🚀 ~ ExportOrdersDetailComponent ~ self.container.addContainer ~ this.orderId:", this.orderId)
    let self = this;
    self.container.addContainer(this.orderId).subscribe((m: any) => {
      if (m.success) {
        this.containerModel = m.model;
        this.getpaged.push(m.model);
        this.gridApi.setGridOption('rowData', this.getpaged);
      }
    });
  }

  onCellValueChanged(data: any) {
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



    self.container.updateContainer(payload).subscribe((m: any) => {
      if (m.success) {
        console.log("🚀 ~ ImportOrdersDetailComponent ~ self.container.updateContainer ~ m:", m)

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
    // let dataValue = [{ "name": "John", "type": "supplier", "email": "kuljeetkhalsa13@gmail.com", "phone": 9915970299, "address": "2phase-Mohali", "contactperson": "Baljit Singh", "created": "10/05/2020" }, { "name": "John", "type": "supplier", "email": "kuljeetkhalsa13@gmail.com", "phone": 9915970299, "address": "2phase-Mohali", "contactperson": "Baljit Singh", "created": "10/05/2020" },]
    // params.api.setRowData(this.getpaged);
    params.api.setGridOption('rowData', this.getpaged);
  }

  onSelectionChanged() {

    this.gl.setRowData = null;
    const selectedNodes = this.agGrid?.api.getSelectedNodes();
    const selectedData: any = selectedNodes?.map((node: any) => node.data);
    this.gl.setRowData = JSON.stringify(selectedData[0])
      ? selectedData[0]
      : null;

    if (this.gl.setRowData) {
      this.detailFlag = true
      this.containerId = this.gl.setRowData.containerId;

      this.getPickLocationByContainerId(this.containerId);
      this.getDropLocationByContainerId(this.containerId);
      this.getunloadingLocationByContainerId(this.containerId);
      this.getHistory(this.containerId);
    }
  }

  changeShippingLine(event: any) {
    let self = this;
    self.shippingLine.GetById(event.value).subscribe((m: any) => {
      if (m.success) {
        this.Form.controls['shippingLineId'].setValue(m.model.id);
        this.selectedShippingLine = m.model;
      }
    });
  }

  changeCustomer(event: any) {
    let self = this;
    self.customer.GetById(event.value).subscribe((m: any) => {
      if (m.success) {
        this.Form.controls['billToId'].setValue(m.model.id);
        this.selectedCustomer = m.model;
      }
    });
  }
  getLocations(locationType: number) {
    this._srvLocationsService.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        this.pickupLocations = response.lstModel;
      },
      error: (err: any) => {

      }
    });
  }

  getEmptyLocations(locationType: number) {
    this._srvLocationsService.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        this.emptyLocations = response.lstModel;
      },
      error: (err: any) => {

      }
    });
  }

  getUnloadingLocations(locationType: number) {
    this._srvLocationsService.getAllLocations(locationType).subscribe({
      next: (response: any) => {
        this.unloadingLocations = response.lstModel;
      },
      error: (err: any) => {

      }
    });
  }

  getPickLocationByContainerId(containerId: number) {
    this._srvContainerPickdropLocationService.GetPickLocationByContainerId(containerId).subscribe({
      next: (response: any) => {
        this.setpickupLocationformvalue(response.model);
      },
      error: (err: any) => {

      }
    });
  }

  getDropLocationByContainerId(containerId: number) {
    this._srvContainerPickdropLocationService.GetDropLocationByContainerId(containerId).subscribe({
      next: (response: any) => {
        this.setemptyLocationformvalue(response.model);
      },
      error: (err: any) => {

      }
    });
  }

  getunloadingLocationByContainerId(containerId: number) {
    this._srvContainerLoadingUnloadingLocationService.GetLoadingUnLoadingLocationByContainerId(containerId).subscribe({
      next: (response: any) => {
        this.loadingUnloadingLocations = response.lstModel;
      },
      error: (err: any) => {

      }
    });
  }

  getHistory(containerId: number) {
    this._srvAssignContainerService.GetHistory(containerId).subscribe({
      next: (response: any) => {
        this.historyLst = response.lstModel;
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
    formdata.orderId = this.orderId;
    formdata.containerId = this.containerId;
    formdata.legTypeId = this.Form.legType;
    formdata.pickUpReservationFromDateTime = this.gl.timeToDateTime(formdata.pickUpReservationFromDateTime);
    formdata.pickUpReservationToDateTime = this.gl.timeToDateTime(formdata.pickUpReservationToDateTime);
    console.log(formdata);
    this._srvContainerPickdropLocationService.UpdatePickLocation(formdata).subscribe((m: any) => {
      if (m.success) {

        this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });

  }

  SaveEmptyUpLocation() {
    var formdata = this.dropLocationForm.value;
    formdata.orderId = this.orderId;
    formdata.containerId = this.containerId;
    formdata.legTypeId = this.Form.legType;
    formdata.dropOffReservationFromDateTime = this.gl.timeToDateTime(formdata.dropOffReservationFromDateTime);
    formdata.dropOffReservationToDateTime = this.gl.timeToDateTime(formdata.dropOffReservationToDateTime);
    console.log(formdata);
    this._srvContainerPickdropLocationService.UpdateDropLocation(formdata).subscribe((m: any) => {
      if (m.success) {

        this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
      } else {
        this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
      }
    });

  }

  // SaveunloadingUpLocation() {
  //   var formdata = this.unloadlocationForm.value;
  //   formdata.containerId = this.containerId;

  //   this._srvContainerLoadingUnloadingLocationService.CreateLoadingUnLoadingLocation(formdata).subscribe((m: any) => {
  //     if (m.success) {
  //       this.unloadlocationForm.reset();
  //       this.getunloadingLocationByContainerId(this.containerId);
  //       this._snackBar.open("Added Successfully!", "Okay", { 'duration': 3000 });
  //     } else {
  //       this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
  //     }
  //   });

  // }

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

  // editunloadingLocation(data: any) {
  //   console.log(data);
  //   this.isunloadingEdit = true;
  //   this.getlocationById(data?.locationId, "Unloading");
  //   //this.getUnloadingLocations(2);

  //   this.unloadlocationForm.controls["containerId"].setValue(data?.containerId);
  //   this.unloadlocationForm.controls["locationId"].setValue(data?.locationId);
  //   this.unloadlocationForm.controls["loadingUnLoadingDate"].setValue(data?.loadingUnLoadingDate);
  //   this.unloadlocationForm.controls["purchaseOrderNumber"].setValue(data?.purchaseOrderNumber);
  //   this.unloadlocationForm.controls["remarks"].setValue(data?.remarks);
  //   this.unloadlocationForm.controls["isInspectionRequired"].setValue(data?.isInspectionRequired);
  //   this.unloadlocationForm.controls["sequenceNo"].setValue(data?.sequenceNo);
  //   this.unloadlocationForm.controls["containerLoadingUnLoadingLocationId"].setValue(data?.containerLoadingUnLoadingLocationId);
  //   this.unloadlocationForm.controls["containerLoadingUnLoadingLocationGuid"].setValue(data?.containerLoadingUnLoadingLocationGuid);

  // }

  // UpdateunloadingUpLocation() {
  //   var formdata = this.unloadlocationForm.value;
  //   formdata.containerId = this.containerId;

  //   this._srvContainerLoadingUnloadingLocationService.updateLoadingUnLoadingLocation(formdata).subscribe((m: any) => {
     
  //     if (m.success) {
  //       this.isunloadingEdit = false;
  //       this.getunloadingLocationByContainerId(this.containerId);
  //       this.unloadlocationForm.reset();
  //       this._snackBar.open("Updated Successfully!", "Okay", { 'duration': 3000 });
  //     } else {
  //       this._snackBar.open("Something went wrong!", "Okay", { 'duration': 3000 });
  //     }
  //   });

  // }

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